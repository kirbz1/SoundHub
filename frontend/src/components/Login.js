import React, { useState } from 'react';
import httpClient from "../httpClient";

const Login = () => {

  //redirect user to home if they try to access '/login' while logged in
  //change to make this run only once when user isn't actually logged in...
  (async () => {
    try {
      await httpClient.get("/user");
      window.location.href = "/";
    } catch (error) {
      //pass
    }
  })();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      await httpClient.post("//localhost:5000/login", {
        email,
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
        <div>Login</div>
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
        <input className={'inputButton'} type="button" value={'Submit'} onClick={() => submitLogin()} />
      </div>
    </div>

    </div>
  )
}

export default Login;