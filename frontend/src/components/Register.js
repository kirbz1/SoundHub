import React, { useEffect, useState } from 'react';
import httpClient from '../httpClient';

const Register = () => {

  //redirect user to home if they try to access '/register' while logged in
  useEffect(() => {
    (async () => {
      try {
        await httpClient.get("/user");
        window.location.href = "/";
      } catch (error) {
        //pass
      }
    })();
  }, []);
  
  
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