import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import { Card, CardGroup } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import httpClient from "../httpClient";

const YourReviews = () => {

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
      await httpClient.post("/reviews", {
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
      setYourReviews(yourReviews.filter(review => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const[showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  
  const [editModalTitle, setEditModalTitle] = useState('');
  const [editModalText, setEditModalText] = useState('');
  const [editModalRating, setEditModalRating] = useState('');
  const [editModalID, setEditModalID] = useState(0);

  const handleEditTextChange = (event) => {
    setEditModalText(event.target.value);
  };

  const handleEditTitleChange = (event) => {
    setEditModalTitle(event.target.value);
  };

  const handleShowEditModal = async(id, title, body, rating) => {
    //show a modal with default entries equal to title, body, rating
    setEditModalID(id);
    setEditModalTitle(title);
    setEditModalText(body);
    setEditModalRating(rating);
    setShowEditModal(true);
  };

  const handleEditStarClick = (starValue) => {
    // If the clicked star is already selected, set rating to 0 (unselect it)
    // Otherwise, set rating to the value of the clicked star
    setEditModalRating(starValue === editModalRating ? 0 : starValue);
  };

  const editReview = async (id) => {
    //submit put request with edit modal values

    try {
      await httpClient.put(`/reviews/${id}`, {
        editModalTitle,
        editModalText,
        editModalRating
      });
      // Remove the deleted review from the state
      window.location.href = "/profile/reviews";
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  return(    
    <div>    
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

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  autoFocus
                  value={editModalTitle}
                  placeholder='Album/Song name...'
                  onChange={handleEditTitleChange}
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
                value={editModalText}
                onChange={handleEditTextChange}
                />
              </Form.Group>
              <div>
                {[1, 2, 3, 4, 5].map(starValue => (
                  <span
                    key={starValue}
                    onClick={() => handleEditStarClick(starValue)}
                    style={{ fontSize: '32px', cursor: 'pointer', color: starValue <= editModalRating ? 'gold' : 'lightgray' }}
                  >
                    ★
                  </span>
                ))}
              </div>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={ () => editReview(editModalID)} >
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
              <Form.Control className="me-auto" placeholder="Search by title... (not functional yet)" />
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
                      <button onClick={() => handleShowEditModal(review.id, review.title, review.body, review.rating)} style={{ position: 'absolute', bottom: 12, right: 50, fontSize: '15px'}}>
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