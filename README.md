# SoundHub
A social platform where users can discuss and discover music.

Built with Flask, React &amp; PostgreSQL.

## To-do (roughly ordered highest to lowest priority)
- Clean up codebase
    - Move routing / models to separate files in backend
    - Differentiate between components/pages



- Trending music (most popular songs/albums in past week e.g. search reviews by past week and find which songs/albums are being positively reviewed the most)
    - Write backend endpoint
    - Display results on frontend
- Display cards for music (use https://www.imdb.com/chart/top/?ref_=nv_mv_250 for inspo), maybe reduce # results per page to 10-15?

- Trending reviews
- Pagination for review results

- Home page

- User profile
    - User profile displays the user's reviews, liked songs, following, followers
        - handle edge cases like user viewing own profile / trying to follow self
        - allow unfollow 
    - "Your reviews" for user
        - Filter reviews by song/album title
        - When creating reviews, allow user to search database of albums/songs in 'album/song name' input section with dropdown of results
        - Popup that confirms delete review
    - Ability to manage account (delete account, change username)
    - personal "Statistics" for current user

- Ability to search music

- Move sync saved spotify songs button to saved songs page

- Display saved songs in a nicer format (pagination + able to click on individual songs to unlike / see more info)

- Spotify login
    - Display top tracks and recommend to add a review for them

- Refine music recommendation system
    - Test more
    - Experiment with different techniques (using features of songs rather than user similarity)
