import React, { useState } from 'react';
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


const App = () => {

  const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false);
  
  return (
    <div>
      <NavbarWithOffcanvas/>
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
            <Route exact path="/callback" element={<Callback onLogin={() => setSpotifyLoggedIn(true)}/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;