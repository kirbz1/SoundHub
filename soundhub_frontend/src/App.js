import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" exact element={<SongList/>} />
                    <Route path="/songs/:id" element={<SongDetail/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </div>
        </Router>
        </>
    );
};


// }

export default App;
