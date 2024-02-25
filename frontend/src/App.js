import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import YourReviews from './components/YourReviews';
import YourLikedSongs from './components/YourLikedSongs';
import Following from './components/Following';
import Followers from './components/Followers';
import ConnectSpotify from './components/ConnectSpotify';
import Statistics from './components/Statistics';
import Music from './components/Music';
import Reviews from './components/Reviews';
import Discover from './components/Discover';
import NotFound from './components/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from 'react';
import UserProfile from'./components/UserProfile';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import httpClient from "./httpClient";

const App = () => {

  const [user, setUser] = useState(null);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const submitLogout = async () => {
    await httpClient.post("/logout");
    setUser(null);
    window.location.href = "/";
  };


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

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === '') {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await httpClient.get(`/search?query=${newQuery}`);
      setResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleBlur = () => {
    // Hide dropdown when focus is lost from input
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const redirectToUserPage = (username) => {
    window.location.href = "/user/" + username;
  }
  

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{height: '80px'}}>
        <Container>
          <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{fontSize: '32px'}}>SoundHub</Navbar.Brand>
          </a>
          
          <Form inline style={{ position: 'relative', height: '40px' }}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  value={query}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Search for users..."
                  className="mr-sm-2"
                  // need to add ability to search music too...
                />
                {showDropdown && (
                  <div className="dropdown">
                    <ul>
                      {results.map((user) => (
                        <li key={user.id} onClick={() => redirectToUserPage(user.username)}>{user.username}</li>
                      ))}
                    </ul>
                  </div>
                )}
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

      <Router>
      
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/profile/reviews" element={<YourReviews/>} />
          <Route exact path="/profile/liked-songs" element={<YourLikedSongs/>} />
          <Route exact path="/profile/following" element={<Following/>} />
          <Route exact path="/profile/followers" element={<Followers/>} />
          <Route exact path="/profile/connect-spotify" element={<ConnectSpotify/>} />
          <Route exact path="/profile/statistics" element={<Statistics/>} />
          <Route exact path="/music" element={<Music/>} />
          <Route exact path="/reviews" element={<Reviews/>} />
          <Route exact path="/discover" element={<Discover/>} />
          <Route exact path="/user/:username" element={<UserProfile/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>

    </div>

  );
}

export default App;