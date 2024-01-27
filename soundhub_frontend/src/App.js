import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch songs from Django backend API
    axios.get('http://localhost:8000/api/songs/')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Error fetching songs:', error));
  }, []);

  return (
    <div>
      <h1>SoundHub</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.artist.name}
            {/* Add rating functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
