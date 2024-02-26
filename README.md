# SoundHub
A social platform where users can discuss and discover music.

Built with Flask, React &amp; PostgreSQL.

## To-do
### High priority
- Spotify login
    - Option to sync liked songs
    - Display top tracks and recommend to add a review for them

- Music recommendation system "Discover"

- Clean up codebase
    - Move routing / models to separate files in backend
    - Differentiate between components/pages

### Low priority

- Update database with more songs / albums / artists / try to get album / song image data + display on website

- Able to search music / differentiate between music/users in search

- User profile
    - User profile displays the user's reviews, liked songs, following, followers
        - handle edge cases like user viewing own profile / trying to follow self
        - allow unfollow 
    - "Your reviews" for user
        - Filter reviews by song/album title
        - When creating reviews, allow user to search database of albums/songs in 'album/song name' input section with dropdown of results
        - Popup that confirms delete review
    - Ability to manage account (delete account, change username)

- Trending songs (e.g. top albums/songs from past week based on # reviews)
- Trending reviews (e.g. top reviews based on # likes in past week)

- "Statistics" for user