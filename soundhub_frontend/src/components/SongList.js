import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/songs/')
            .then(response => setSongs(response.data))
            .catch(error => console.error('Error fetching songs:', error));
    }, []);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
                        <Navbar.Brand>SoundHub</Navbar.Brand>
                    </a>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href="http://localhost:3000/login">
                            <Button variant="light">Login</Button>
                        </a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div className='center'>
            <h2>Song List</h2>
                <ul>
                    {songs.map(song => (
                        <li key={song.id}>{song.title} by {song.artist} - Album: {song.album}</li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default SongList;
