import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import httpClient from "../httpClient";

const Reviews = () => {
  const [user, setUser] = useState(null);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/reviews'.");
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
        const response = await httpClient.get("/user");
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log("Not authenticated");
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
          <Col sm={6}>
            {/* Content for the first column */}
            <div className='mainContainer'>
              <h3 className='titleContainer'>Top Reviews</h3>
              <ul>
              {(typeof reviews === 'undefined') ? (
                <p>Loading reviews...</p>
                ): (
                  reviews.map(review => (
                    <>
                    <li key={review.id}>{review.title} - {review.rating}/5</li>
                    <p key={review.id}>By {review.user} ({review.date})</p>
                    <p key={review.id}>{review.body}</p>
                    <p key={review.id}>{review.num_likes} likes</p>
                    </>
                  ))
                )}
            </ul>
            </div>
          </Col>
          <Col sm={6}>
            {/* Content for the second column */}
            <div className='mainContainer'>
              <h3 className='titleContainer'>Trending Reviews</h3>
              <p>define endpoint for trending reviews</p>
            </div>
          </Col>
        </Row>
      </div>

      </div>
  )
}

export default Reviews;