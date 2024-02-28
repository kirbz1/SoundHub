import React, { useState, useEffect } from 'react';
import httpClient from '../httpClient';



const YourLikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await httpClient.get('/user/liked_songs');
        setLikedSongs(response.data);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    fetchLikedSongs();
  }, []);

  return(   
    <div>
      <br/>
      <div className='titleContainer'>
        <h5>Your Liked Songs</h5>
      </div>
      <div className='center'>
        <ul>
          {likedSongs.map(song => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
        {/* use list group + pagination + search */}
        {/* add ability to unlike individual songs, expand a modal when clicking on a song to view associated info like artist/album/release year/rating */}
      </div>
    </div>
  )
}

export default YourLikedSongs;