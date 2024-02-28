from flask import Flask, jsonify, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from dotenv import load_dotenv
import os
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import ARRAY
from sqlalchemy.ext.mutable import MutableList
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
import pandas as pd
import numpy as np


# PostgreSQL Database credentials loaded from the .env file
load_dotenv()
DATABASE = os.getenv('DATABASE')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

sp_oauth = SpotifyOAuth(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI, scope='user-library-read')

class ApplicationConfig:
    SECRET_KEY = 'bwiohgoiwhbgoiwhjoigbwoi'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://' + DATABASE_USERNAME + ':' + DATABASE_PASSWORD + '@localhost/' + DATABASE

    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_TYPE = 'filesystem'


app = Flask(__name__)

app.config.from_object(ApplicationConfig)

server_session = Session(app)
CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)


# database / models

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    liked_songs_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])
    reviews_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])
    following_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])
    follower_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])

class Artist(db.Model):
    __tablename__ = "artists"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    album_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])
    song_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])

class Album(db.Model):
    __tablename__ = "albums"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    artist_id = db.Column(db.Integer)
    song_ids = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), default=[])
    rating = db.Column(db.Float, default=0)
    num_ratings = db.Column(db.Integer, default=0)

class Song(db.Model):
    __tablename__ = "songs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    album_id = db.Column(db.Integer)
    artist_id = db.Column(db.Integer)
    rating = db.Column(db.Float, default=0)
    num_ratings = db.Column(db.Integer, default=0)

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    user_username = db.Column(db.String)
    album_id = db.Column(db.Integer)
    song_id = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    title = db.Column(db.String(100))
    body = db.Column(db.String(1000))
    date = db.Column(db.DateTime)
    num_likes = db.Column(db.Integer, default=0)





# routing


@app.route("/register", methods=["POST"])
def register_user():
    #gets user, email and password input
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password=password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    #checking if the password is the same as hashed password
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    session.pop("token_info")
    return "200"

@app.route("/user")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

@app.route("/user/<username>")
def get_user_from_username(username):
    user = User.query.filter_by(username=username).first()
    if user:
        user = {'id': user.id, 'username': user.username, 'email': user.email}
        return jsonify(user)
    else:
        return 404

@app.route('/search')
def search_users():
    query = request.args.get('query', '')
    # Query the database for users whose usernames match the query (case-insensitive)
    results = User.query.filter(User.username.ilike(f"%{query}%")).all()
    # Serialize the results to JSON
    results = [{'id': user.id, 'username': user.username} for user in results]
    return jsonify(results)

@app.route("/user/reviews")
def get_current_user_reviews():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_reviews = Review.query.filter_by(user_id=user_id)
    user_reviews = [{'id': review.id, 'user': review.user_username, 'date': review.date, 'title': review.title, 'body': review.body, 'rating': review.rating, 'num_likes': review.num_likes} for review in user_reviews]
    return jsonify(user_reviews)

@app.route("/user/liked_songs")
def get_current_user_liked_songs():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    songs = []
    for song_id in user.liked_songs_ids:
        song = Song.query.filter_by(id=song_id).first()
        if song != None:
            song = {'id': song.id, 'title': song.title}
            songs.append(song)
    return jsonify(songs)



@app.route('/songs')
def fetch_all_songs():
    songs = Song.query.all()
    songs = [{'id': song.id, 'title': song.title, 'artist': Artist.query.filter_by(id=song.artist_id).first().name, 'rating': song.rating} for song in songs]
    songs = sorted(songs, key=lambda x: x['rating'], reverse=True)
    return jsonify(songs), 200

@app.route('/albums')
def fetch_all_albums():
    albums = Album.query.all()
    albums = [{'id': album.id, 'title': album.title, 'artist': Artist.query.filter_by(id=album.artist_id).first().name, 'rating': album.rating} for album in albums]
    albums = sorted(albums, key=lambda x: x['rating'], reverse=True)
    return jsonify(albums), 200

@app.route('/reviews', methods=['GET', 'POST'])
def handle_get_post_reviews():
    if request.method == 'GET':
        reviews = Review.query.all()
        reviews = [{'id': review.id, 'user': review.user_username, 'date': review.date, 'title': review.title, 'body': review.body, 'rating': review.rating, 'num_likes': review.num_likes} for review in reviews]
        reviews = sorted(reviews, key=lambda x: x['num_likes'], reverse=True)
        return jsonify(reviews), 200
    if request.method == 'POST':
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        username = User.query.filter_by(id=user_id).first().username
        rating = request.json['rating']
        title = request.json['reviewTitle']
        body = request.json['reviewText']
        
        new_review = Review(user_id=user_id, user_username=username, rating=rating, title=title, body=body, date=datetime.now(), num_likes=0)

        db.session.add(new_review)
        db.session.commit()
        
        user = User.query.filter_by(id=user_id).first()
        user.reviews_ids.append(new_review.id)
        db.session.commit()
        return "200"

@app.route('/reviews/<int:id>', methods=['PUT', 'DELETE'])
def handle_put_delete_reviews(id):
    if request.method == 'PUT':
        review = Review.query.get(id)

        if review:
            review.title = request.json['editModalTitle']
            review.body = request.json['editModalText']
            review.rating = request.json['editModalRating']

            try:
                db.session.commit()
                return jsonify({'message': 'Review updated successfully'})
            except SQLAlchemyError as e:
                db.session.rollback()
                return jsonify({'message': 'Failed to update review', 'error': str(e)}), 500
        else:
            return jsonify({'message': 'Review not found'}), 404

    if request.method == 'DELETE': 
        review = Review.query.get(id)

        if review:
            try:
                user_id = session.get("user_id")
                user = User.query.filter_by(id=user_id).first()
                if review.id in user.reviews_ids:
                    user.reviews_ids.remove(review.id)

                db.session.delete(review)
                db.session.commit()
                return jsonify({'message': 'Review deleted successfully'})
            except SQLAlchemyError as e:
                db.session.rollback()
                return jsonify({'message': 'Failed to delete review', 'error': str(e)}), 500
        else:
            return jsonify({'message': 'Review not found'}), 404

@app.route('/follow', methods=['GET', 'POST'])
def handle_follow_user():
    if request.method == "POST":
        curr_user_id = session.get("user_id")

        if not curr_user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        curr_user = User.query.filter_by(id=curr_user_id).first()
        followed_user_id = request.json['id']
        followed_user = User.query.filter_by(id=followed_user_id).first()
        curr_user.following_ids.append(followed_user_id)
        followed_user.follower_ids.append(curr_user_id)
        db.session.commit()
        return "200"
    if request.method == "GET":
        curr_user_id = session.get("user_id")
        queried_user_id = request.args.get('id')
        queried_user = User.query.filter_by(id=queried_user_id).first()
        is_following = curr_user_id in queried_user.follower_ids
        return jsonify({'isFollowing': is_following}), 200
        
@app.route('/spotify/login')
def spotify_login():
    auth_url = sp_oauth.get_authorize_url()
    return auth_url

@app.route('/spotify/callback')
def spotify_callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    session['token_info'] = token_info
    return '200'

@app.route('/spotify/login_status')
def spotify_get_login_status():
    if 'token_info' not in session:
        return jsonify({'status': False})
    else:
        return jsonify({'status': True})

@app.route('/spotify/sync_liked_songs')
def spotify_get_saved_tracks():
    if 'token_info' not in session:
        return redirect('/')

    token_info = session['token_info']
    sp = Spotify(auth=token_info['access_token'])

    # Get the user's saved tracks
    total = sp.current_user_saved_tracks()['total']
    offset = 0
    max_limit = 50
    results = []
    while len(results) < total:
        curr_tracks = sp.current_user_saved_tracks(limit=max_limit, offset=offset)['items']
        results.extend([(track['track']['name'], track['track']['artists'][0]['name'], track['track']['album']['name']) for track in curr_tracks])
        offset += 50
    
    #init user object for use during loop
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    #add each result track to user.liked_songs
    while len(results) > 0:
        curr_track = results.pop()

        track = Song.query.filter_by(title=curr_track[0]).first()
        album = Album.query.filter_by(title=curr_track[2]).first()
        artist = Artist.query.filter_by(name=curr_track[1]).first()



        #initialise missing objects
        if artist == None:
            artist = Artist(name=curr_track[1])
            db.session.add(artist)
            db.session.commit()

            
        if album == None:
            album = Album(title=curr_track[2], artist_id=artist.id)
            db.session.add(album)
            db.session.commit()

        if track == None: 
            track = Song(title=curr_track[0], album_id=album.id, artist_id=artist.id)
            db.session.add(track)
            db.session.commit()
        
        if track.id not in album.song_ids:
                album.song_ids.append(track.id)
                db.session.commit()

        if track.id not in artist.song_ids:
            artist.song_ids.append(track.id)
            db.session.commit()
            
        if album.id not in artist.album_ids:
            artist.album_ids.append(album.id)
            db.session.commit()
        

        

        if track.id in user.liked_songs_ids:
            pass
        else:
            user.liked_songs_ids.append(track.id)
            db.session.commit()

    

    return '200'



    





@app.route('/discover')
def discover_songs():
    
    data = { 'user_id': [], 'song_id': [] }

    for user in User.query.all():
        data['user_id'].extend([user.id] * len(user.liked_songs_ids))
        data['song_id'].extend(user.liked_songs_ids)

    
    df = pd.DataFrame(data)
    
    user_item_matrix = df.pivot_table(index='user_id', columns='song_id', aggfunc=lambda x: 1, fill_value=0)

    def cosine_similarity(vector1, vector2):
        dot_product = np.dot(vector1, vector2)
        norm_vector1 = np.linalg.norm(vector1)
        norm_vector2 = np.linalg.norm(vector2)
        return dot_product / (norm_vector1 * norm_vector2)
    
    user_similarity_matrix = np.zeros((len(user_item_matrix), len(user_item_matrix)))
    
    for i in range(len(user_item_matrix)):
        for j in range(len(user_item_matrix)):
            user_similarity_matrix[i, j] = cosine_similarity(user_item_matrix.iloc[i], user_item_matrix.iloc[j])

    def find_similar_users(user_id, k=5):
        similar_users = sorted(list(enumerate(user_similarity_matrix[user_id])), key=lambda x: x[1], reverse=True)
        similar_users = [x[0] for x in similar_users if x[0] != user_id]
        return similar_users[:k]

    def recommend_songs(user_id, k=5):
        similar_users = find_similar_users(user_id)
        recommended_songs = set()
        for sim_user in similar_users:
            liked_songs = df[df['user_id'] == sim_user]['song_id']
            for song in liked_songs:
                if song not in df[df['user_id'] == user_id]['song_id']:
                    recommended_songs.add(song)
                    if len(recommended_songs) == k:
                        return list(recommended_songs)
        return list(recommended_songs)
    
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    recommended_songs_ids = recommend_songs(user_id)
    recommended_songs = [{'id': song_id, 'title': Song.query.filter_by(id=song_id).first().title, 'artist': Artist.query.filter_by(id=Song.query.filter_by(id=song_id).first().artist_id).first().name} for song_id in recommended_songs_ids]
    return jsonify(recommended_songs)

if __name__ == '__main__':
    app.run(debug=True)