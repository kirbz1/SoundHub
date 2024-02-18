import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Container, Button } from 'react-bootstrap';

function App() {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetch("/songs")
    .then(response => response.json())
    .then(data => {setSongs(data)})
  }, [])


  return(    
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoundHub</Navbar.Brand>
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

      <div className='center'><h2>Top songs</h2></div>

      <div className='center'>
        <ul>
          {(typeof songs === 'undefined') ? (
            <p>Loading songs...</p>
            ): (
              songs.map(song => (
                <li key={song.id}>{song.title} by {song.artist}</li>
              ))
            )}
        </ul>
        
      </div>
    </div>
  )
}

export default App;