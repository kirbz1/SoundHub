# SoundHub
A social platform where users can discuss and discover music.

Built with Flask, React &amp; PostgreSQL.

## To-do
### High priority
- Spotify login
    - Option to sync liked songs
    - Display top tracks and recommend to add a review for them
    - Spotify web playback sdk to stream music

- Music recommendation system 

- Clean up codebase
    - Move routing / models to separate files in backend
    - Differentiate between components/pages

### Low priority
- User profile displays the user's reviews, liked songs, following, followers
    - handle edge cases like user viewing own profile / trying to follow self
    - allow unfollow 
- Able to search music / differentiate between music/users in search
- "Your reviews" for user
    - Filter reviews by song/album title
    - When creating reviews, allow user to search database of albums/songs in 'album/song name' input section with dropdown of results
    - Popup that confirms delete review
- "Your liked songs" for user
- "Following" for user
- "Followers" for user
- "Connect to spotify" for user
- "Statistics" for user
- Make "Manage account" page for user (underneath statistics, include ability to delete account, change username etc.)
- Search bar functionality (searching users / music)
- Trending songs (e.g. top albums/songs from past week based on # reviews)
- Trending reviews (e.g. top reviews based on # likes in past week)
- Discover page (implement backend endpoint that uses some sort of ML recommendation system to suggest a couple songs to user based on liked songs / rating history)
- Update database with more songs / albums / artists / try to get album / song image data + display on website
- Feed-like section that displays connected users' activity / ratings (maybe global / popular then ability to switch to friends only)