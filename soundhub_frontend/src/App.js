import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';

const App = () => {
  return (
      <Router>
          <div>
              <Switch>
                  <Route path="/" exact component={SongList} />
                  <Route path="/songs/:id" component={SongDetail} />
              </Switch>
          </div>
      </Router>
  );
};

export default App;
