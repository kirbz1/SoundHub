import React from 'react';
import { Button } from 'react-bootstrap';

const Home = (spotifyLoggedIn) => {

  return (    
    <div>

      <h3 className='mainContainer'>Welcome!</h3>
      <p className='center'>Click 'Music', 'Reviews', or 'Discover' to view available content.</p>
      <p className='center'>Login/register and click on your email in the top right to view more options.</p>
      { spotifyLoggedIn && (
        <>
        <p className='center'>You're logged into Spotify!</p>
        <div className='center'>
          <Button>Sync Saved Spotify Songs</Button>
        </div>
        </>
      )}
    </div>
  );
};

export default Home;