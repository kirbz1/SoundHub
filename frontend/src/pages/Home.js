import React from 'react';
import { Button } from 'react-bootstrap';
import httpClient from '../httpClient';

const Home = (spotifyLoggedIn) => {

  const syncLikedSongs = async () => {
    try {
      // Send GET request to server endpoint to check user login status
      await httpClient.get('/spotify/sync_liked_songs').then(response => console.log(response.data));
      
    } catch (error) {
      console.error('Error syncing liked songs:', error);
    }
  };

  return (    
    <div>

      <h3 className='mainContainer'>Welcome!</h3>
      <p className='center'>Click 'Music', 'Reviews', or 'Discover' to view available content.</p>
      <p className='center'>Login/register and click on your email in the top right to view more options.</p>
      { spotifyLoggedIn.spotifyLoggedIn === true ? (
        <>
        <p className='center'>You're logged into Spotify!</p>
        <div className='center'>
          <Button onClick={syncLikedSongs}>Sync Saved Spotify Songs</Button>
        </div>
        </>
      ) : (
        null
      )}
    </div>
  );
};

export default Home;