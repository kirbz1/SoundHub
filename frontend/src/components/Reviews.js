import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import httpClient from "../httpClient";

const Reviews = () => {
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


  return(    
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
  )
}

export default Reviews;