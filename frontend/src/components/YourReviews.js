import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import { Card, CardGroup } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import httpClient from "../httpClient";

const YourReviews = () => {

  const [user, setUser] = useState(null);

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

  const submitLogout = async () => {
    await httpClient.post("/logout");
    setUser(null);
    window.location.href = "/";
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [yourReviews, setYourReviews] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get("/user/reviews");
        setYourReviews(response.data);
      } catch (error) {
        console.log("Couldn't fetch '/reviews'.");
      }
    })();
  }, []);

  const[showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  const [rating, setRating] = useState(0); // Initial rating is 0 (no stars selected)
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');

  const handleStarClick = (starValue) => {
    // If the clicked star is already selected, set rating to 0 (unselect it)
    // Otherwise, set rating to the value of the clicked star
    setRating(starValue === rating ? 0 : starValue);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };


  const submitReview = async () => {
    setShowModal(false);
    try {
      await httpClient.post("//localhost:5000/reviews", {
        rating,
        reviewText,
        reviewTitle
      });
    window.location.href = "/profile/reviews";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials!");
      }
    }
  };

  const deleteReview = async (id) => {
    try {
      await httpClient.delete(`/reviews/${id}`);
      // Remove the deleted review from the state
      setYourReviews(yourReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  //define showEditModal bool
  //define editModalTitle, editModalText, editModalRating

  //const showEditModal = async(title, body, rating) => {
    //show a modal with default entries equal to title, body, rating

  //};

  const editReview = async (id) => {
    //submit put request with edit modal values

    // try {
    //   await httpClient.put(`/reviews/${id}`);
    //   // Remove the deleted review from the state
    //   setYourReviews(yourReviews.filter(review => review.id !== id));
    // } catch (error) {
    //   console.error('Error editing review:', error);
    // }
  };

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
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Review</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  autoFocus
                  placeholder='Album/Song name...'
                  onChange={handleReviewTitleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                as="textarea"
                rows={3}
                placeholder='Add a review...'
                value={reviewText}
                onChange={handleReviewTextChange}
                />
              </Form.Group>
              <div>
                {[1, 2, 3, 4, 5].map(starValue => (
                  <span
                    key={starValue}
                    onClick={() => handleStarClick(starValue)}
                    style={{ fontSize: '32px', cursor: 'pointer', color: starValue <= rating ? 'gold' : 'lightgray' }}
                  >
                    ★
                  </span>
                ))}
              </div>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={submitReview} >
              Submit
            </Button>
          </Modal.Footer>
      </Modal>
    
                <br/>
      <div className='titleContainer'>
            <h4>Your Reviews</h4>
          </div>
          {/* modals for creating review... */}
          <div className='center'>
            <Stack direction="horizontal" gap={3} style={{width:'500px'}}>
              <Form.Control className="me-auto" placeholder="Search by title..." />
              <Button variant="secondary" style={{width:'150px'}} onClick={handleShowModal}>Create Review</Button>
            </Stack>
          </div>
          <div className='center'>
            <CardGroup>
              {yourReviews.map(review => (
                <Card key={review.id}>
                  <Card.Body style={{ position: 'relative' }}>
                    <Card.Title>
                      {review.title} - {review.rating}/5
                      <button onClick={() => editReview(review.id, review.title, review.body, review.rating)} style={{ position: 'absolute', bottom: 12, right: 50, fontSize: '15px'}}>
                        <FaPencilAlt /> {/* Use the trash bin icon */}
                      </button>
                      <button onClick={() => deleteReview(review.id)} style={{ position: 'absolute', bottom: 12, right: 10, fontSize: '15px'}}>
                        <FaTrash /> {/* Use the trash bin icon */}
                      </button>
                    </Card.Title>
                    
                    <Card.Subtitle>By {review.user} ({review.date})</Card.Subtitle>
                    <Card.Text>{review.body}</Card.Text>
                    <Card.Subtitle>{review.num_likes} likes</Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
            {/*pagination for excess number of reviews?*/}
          </div>

            
      </div>
  )
}

export default YourReviews;