import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';

const App = () => {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" exact element={<SongList/>} />
                  <Route path="/songs/:id" element={<SongDetail/>} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;
