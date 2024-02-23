import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import httpClient from "../httpClient";

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/albums");
        setAlbums(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/albums'.");
      }
    })();
    (async () => {
      try {
        const response = await httpClient.get("/songs");
        setSongs(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/songs'.");
      }
    })();
  }, []);


  return(    
    <div>
      <div>
      <Row>
        <Col sm={4}>
          {/* Content for the first column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Top Albums</h3>
            <ul>
              {(typeof albums === 'undefined') ? (
                <p>Loading albums...</p>
                ): (
                  albums.map(album => (
                    <li key={album.id}>{album.title} by {album.artist} ({album.rating}/5)</li>
                  ))
                )}
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          {/* Content for the second column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Top Songs</h3>
            <ul>
              {(typeof songs === 'undefined') ? (
                <p>Loading songs...</p>
                ): (
                  songs.map(song => (
                    <li key={song.id}>{song.title} by {song.artist} ({song.rating}/5)</li>
                  ))
                )}
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          {/* Content for the second column */}
          <div className='mainContainer'>
            <h3 className='titleContainer'>Trending</h3>
              <p>Define an endpoint to get most popular songs / albums from the past week</p>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default Music;