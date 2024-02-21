import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import httpClient from '../httpClient';

const Register = () => {

  //redirect user to home if they try to access '/register' while logged in
  (async () => {
    try {
      await httpClient.get("/user");
      window.location.href = "/";
    } catch (error) {
      //pass
    }
  })();
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const submitRegister = async () => {
    try {
      await httpClient.post("/register", {
        email,
        username,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials!");
      }
    }
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
              className=" mr-sm-2"
            />
          </Col>
        </Row>
      </Form>
      <Nav className="me-auto">
            <Nav.Link href="#music">Music</Nav.Link>
            <Nav.Link href="#reviews">Reviews</Nav.Link>
            <Nav.Link href="#discover">Discover</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            <a href="http://localhost:3000/login">
                <Button variant="light" style={{width : '90px'}}>Login</Button>
                </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          placeholder="Enter your username here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          placeholder="Enter your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" value={'Submit'} onClick={() => submitRegister()} />
      </div>
    </div>

    </div>
  )
}

export default Register;