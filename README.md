# SoundHub
A social platform where users can discuss and discover music.

Built with Flask, React &amp; PostgreSQL.

## To-do (roughly ordered highest to lowest priority)


    
- Reviews
    - Clean SQL table
    - Copy music display
    - allow like/comments for reviews
    - Trending reviews

- User profile
    - User profile displays the user's reviews, liked songs, following, followers
        - handle edge cases like user viewing own profile / trying to follow self
        - allow unfollow 
    - "Your reviews" for user
        - Filter reviews by song/album title
        - When creating reviews, allow user to search database of albums/songs in 'album/song name' input section with dropdown of results
        - Popup that confirms delete review
    - "your saved songs"
        - Display saved songs in a nicer format (pagination + able to click on individual songs to unlike / see more info)
        - Move sync saved spotify songs button to saved songs page
    - Ability to manage account (delete account, change username)
    - personal "Statistics" for current user

- Display cards for music
    - Allow reviewing / viewing more info by clicking a menu item
        - Only display one dropdown menu per item at a time (e.g. open another one closes the current one)
        - Album/song page that shows rating, blurb, other info like reviews, genre, artist, bla bla 
        - Dynamic save/unsave option depending on whether user has the item saved
        - Allow saving albums
        - Ensure when posting a review, the relevant Song/Album object's rating / num_reviews is updated

    - Allow filtering options
        - Maybe by default display only top 250 songs/albums
        - By genre
        - By release year


- Home page

- Ability to search music

- Spotify login
    - Display top tracks and recommend to add a review for them

- Refine music recommendation system
    - Test more
    - Experiment with different techniques (using features of songs rather than user similarity)
