import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

function Routing() {

  return (
    <div>
      <Router>
        <Routes>
                    
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
                     
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;



