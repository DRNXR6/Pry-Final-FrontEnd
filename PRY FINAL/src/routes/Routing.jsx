import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import SobreWeb from '../pages/SobreWeb';
import Contacto from '../pages/contacto';
import MarketPlace from '../pages/MarketPlace';
import DetailsPage from '../pages/DetailsPage';

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

            

            <Route path="/details" element={<DetailsPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing;



