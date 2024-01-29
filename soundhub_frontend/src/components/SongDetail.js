import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongDetail = ({ match }) => {
    const [song, setSong] = useState({});

    useEffect(() => {
        const songId = match.params.id;
        axios.get(`http://localhost:8000/api/songs/${songId}/`)
            .then(response => setSong(response.data))
            .catch(error => console.error('Error fetching song:', error));
    }, [match.params.id]);

    return (
        <div>
            <h2>Song Detail</h2>
            <p>Title: {song.title}</p>
            <p>Artist: {song.artist}</p>
            <p>Rating: {song.rating}</p>
            {/* Add update and delete functionality here */}
        </div>
    );
};

export default SongDetail;
