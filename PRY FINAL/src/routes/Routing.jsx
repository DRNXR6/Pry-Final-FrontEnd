import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import SobreWeb from '../pages/SobreWeb';
import Contacto from '../pages/contacto';
import MarketPlace from '../pages/MarketPlace';

function Routing() {

  return (
    <div>
      <Router>
        <Routes>
                    
            <Route path="/" element={<Home/>}/>
            <Route path="/SobreWeb" element={<SobreWeb/>}/>
            <Route path="/contacto" element={<Contacto/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/MarketPlace" element={<MarketPlace/>}/>
                     
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;



