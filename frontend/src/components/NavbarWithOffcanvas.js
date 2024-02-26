import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import httpClient from "../httpClient";


const NavbarWithOffcanvas = (spotifyLoggedIn) => {

    const [loaded, setLoaded] = useState(false);

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
        setLoaded(true);
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
        <>
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
            {loaded ? (
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
            ) : (
              <div className='spinner-border text-light' role='status'/>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Stack gap={4}>
          <hr/>
          <a href={"http://localhost:3000/user/" + user?.username} style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Your Profile</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/reviews" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Your Reviews</Offcanvas.Title></a>
          <hr/>
          <a href="http://localhost:3000/profile/liked-songs" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Your Saved Songs</Offcanvas.Title></a>
          <hr/>
          { !spotifyLoggedIn && (
          <>
          <a href="http://localhost:3000/profile/connect-spotify" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Connect to Spotify</Offcanvas.Title></a>
          <hr/>
          </>
          )}
          
          {/* <a href="http://localhost:3000/profile/statistics" style={{textDecoration: 'none', marginLeft:'30px', color: 'black'}}><Offcanvas.Title>Statistics</Offcanvas.Title></a>
          <hr/> */}
        </Stack>

      </Offcanvas>
      </>
    )
}

export default NavbarWithOffcanvas;