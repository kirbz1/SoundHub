import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import httpClient from "../httpClient";

const Music = () => {

  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/user");
        setUser(response.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);



  const submitLogout = async () => {
    await httpClient.post("/logout");
    setUser(null);
    window.location.href = "/";
  };



  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/songs");
        setSongs(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/songs'.");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/albums");
        setAlbums(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/albums'.");
      }
    })();
  }, []);




  return(    
    <div>
      <Navbar bg="dark" variant="dark" style={{height: '80px'}}>
        <Container>
            <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{fontSize: '32px'}}>SoundHub</Navbar.Brand>
            </a>
            <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              //  (Users / Music) -- make wider / maybe dropdown results that refresh each time user enters text
              className=" mr-sm-2"
            />
          </Col>
        </Row>
      </Form>
      <Nav className="me-auto">
            <Nav.Link href="/music">Music</Nav.Link>
            <Nav.Link href="/reviews">Reviews</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            { user === null ? (
                <>
                <a href="http://localhost:3000/login">
                <Button variant="light" style={{marginRight : '15px', width : '90px'}}>Login</Button>
                </a>
                <a href="http://localhost:3000/register">
                <Button variant="light" style={{marginLeft : '15px', width : '90px'}}>Register</Button>
                </a>
                </>
              ) : (
              <>
              <h5 style={{display: 'inline-block', fontSize: '16px', marginRight: '20px'}}>Signed in: <span style={{color:'white', cursor:'pointer', textDecoration: 'underline'}} onClick={handleShow}>{user.email}</span></h5>
              <Button variant="light" onClick={() => submitLogout()}>Logout</Button> 
              </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        
        <Stack gap={4}>
          <hr/>
          <a href="http://localhost:3000/profile/reviews" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Your Reviews</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/liked-songs" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Your Liked Songs</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/following" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Following</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/followers" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Followers</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/connect-spotify" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Connect to Spotify</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/statistics" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Statistics</Offcanvas.Title></a>
          <hr/>
        </Stack>

      </Offcanvas>

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