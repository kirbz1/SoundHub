import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import YourReviews from './components/YourReviews';
import YourLikedSongs from './components/YourLikedSongs';
import Following from './components/Following';
import Followers from './components/Followers';
import ConnectSpotify from './components/ConnectSpotify';
import Statistics from './components/Statistics';
import Music from './components/Music';
import Reviews from './components/Reviews';
import Discover from './components/Discover';
import NotFound from './components/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/profile/reviews" element={<YourReviews/>} />
          <Route exact path="/profile/liked-songs" element={<YourLikedSongs/>} />
          <Route exact path="/profile/following" element={<Following/>} />
          <Route exact path="/profile/followers" element={<Followers/>} />
          <Route exact path="/profile/connect-spotify" element={<ConnectSpotify/>} />
          <Route exact path="/profile/statistics" element={<Statistics/>} />
          <Route exact path="/music" element={<Music/>} />
          <Route exact path="/reviews" element={<Reviews/>} />
          <Route exact path="/discover" element={<Discover/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;