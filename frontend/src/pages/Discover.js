import React, { useState, useEffect } from 'react';
import httpClient from '../httpClient';

const Discover = () => {

  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      try {
        const response = await httpClient.get('/discover');
        setRecommendedSongs(response.data);
      } catch (error) {
        console.error('Error fetching recommended songs:', error);
      }
    };

    fetchRecommendedSongs();
  }, []);

  return(    
      <div className='mainContainer'>
        <h3 className='titleContainer'>Songs You Might Like (Collaborative Filtering)</h3>
          <ul>
            {recommendedSongs.map(song => (
              <li key={song.id}>{song.title} by {song.artist}</li>
            ))}
          </ul>
      </div>
  )
}

export default Discover;