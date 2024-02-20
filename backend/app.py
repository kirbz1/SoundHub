from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from dotenv import load_dotenv
import os



# PostgreSQL Database credentials loaded from the .env file
load_dotenv()
DATABASE = os.getenv('DATABASE')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

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
    __tablename__ = "users" #for table name
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)

class Song(db.Model):
    __tablename__ = "songs" #for table name
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    artist = db.Column(db.String(100))



# routing


#should probably handle case that a user is already logged in and submits a register request - shouldn't be allowed
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


@app.route('/songs')
def fetch_all_songs():
    songs = Song.query.all()
    songs = [{'id': song.id, 'title': song.title, 'artist': song.artist} for song in songs]
    return jsonify(songs), 200


if __name__ == '__main__':
    app.run(debug=True)