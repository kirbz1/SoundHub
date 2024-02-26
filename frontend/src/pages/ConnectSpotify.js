import React from 'react';
import { Button } from 'react-bootstrap';
import httpClient from '../httpClient';

const ConnectSpotify = () => {
  
  const handleSpotifyLogin = async () => {
    try {
      // Make a GET request to the '/spotify/login' endpoint on your backend
      const response = await httpClient.get('/spotify/login');
      
      const authUrl = response.data;

      window.location.href = authUrl;
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  return(    
    <div className='center'>
      <Button onClick={handleSpotifyLogin}>Continue with Spotify</Button>
    </div>
  )
}

export default ConnectSpotify;