import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NotFound = () => {

  return(    
    <div>
      <Navbar bg="dark" variant="dark" style={{height: '80px'}}>
        <Container>
        <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{fontSize: '32px'}}>SoundHub</Navbar.Brand>
            </a>
            
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div className='center'>
    <h4>404 Page Not Found</h4>
    </div>
    <div className='center'>
      <a href="http://localhost:3000/">
      <button>Back to Home</button>
    </a>
    </div>
    
    


    </div>
  )
}

export default NotFound;