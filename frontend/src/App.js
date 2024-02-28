import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import YourReviews from './pages/YourReviews';
import YourLikedSongs from './pages/YourLikedSongs';
import ConnectSpotify from './pages/ConnectSpotify';
import Music from './pages/Music';
import Reviews from './pages/Reviews';
import Callback from './pages/Callback';
import Discover from './pages/Discover';
import NotFound from './pages/NotFound';
import UserProfile from'./pages/UserProfile';
// import Statistics from './pages/Statistics';

import NavbarWithOffcanvas from './components/NavbarWithOffcanvas';
import httpClient from './httpClient';


const App = () => {

  const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false);

  // send get request to check if spotifyLoggedIn == true
  useEffect(() => {
    // Function to send GET request and check user login status
    const checkLoginStatus = async () => {
      try {
        // Send GET request to server endpoint to check user login status
        const response = await httpClient.get('/spotify/login_status');

        // Assuming the server responds with a boolean indicating login status
        const isLoggedIn = response.data.status;

        // Update loggedIn state based on the response
        setSpotifyLoggedIn(isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    // Call the function to check login status when component mounts
    checkLoginStatus();
  }, []);

  return (
    <div>
      <NavbarWithOffcanvas spotifyLoggedIn={spotifyLoggedIn}/>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home spotifyLoggedIn={spotifyLoggedIn}/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/profile/reviews" element={<YourReviews/>} />
            <Route exact path="/profile/liked-songs" element={<YourLikedSongs/>} />
            <Route exact path="/profile/connect-spotify" element={<ConnectSpotify/>} />
            {/* <Route exact path="/profile/statistics" element={<Statistics/>} /> */}
            <Route exact path="/music" element={<Music/>} />
            <Route exact path="/reviews" element={<Reviews/>} />
            <Route exact path="/discover" element={<Discover/>} />
            <Route exact path="/user/:username" element={<UserProfile/>} />
            <Route exact path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;