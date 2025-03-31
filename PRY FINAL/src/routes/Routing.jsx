  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Login from '../pages/Login';
  import Register from '../pages/Register';
  import Home from '../pages/Home';
  import AboutWeb from '../pages/AboutWeb';
  import Contacto from '../pages/contacto';
  import MarketPlace from '../pages/MarketPlace';
  import MarketPlacePublic from '../pages/MarketPlacePublic';
  import DetailsPage from '../pages/DetailsPage';
  import Edit from '../pages/Edit';
  import ChatPage from '../pages/ChatPage';
  import GoodsAndServicesPagePublic from '../pages/GoodsAndServicesPagePublic';
  import GoodsAndServicesPage from '../pages/GoodsAndServicesPage';
  import GoodsAndServicesPageUser from '../pages/GoodsAndServicesPageUser';

  import PrivateRoute from '../components/PrivateRoute';
  
  function Routing() {
    return (
      <div>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/GoodsAndServicesPagePublic" element={<GoodsAndServicesPagePublic />} />
            <Route path="/GoodsAndServicesPageUser" element={<GoodsAndServicesPageUser />} />
            <Route path="/AboutWeb" element={<AboutWeb />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/MarketPlacePublic" element={<MarketPlacePublic />} />
            <Route path="/details" element={<DetailsPage />} />



            {/* Rutas protegidas con PrivateRoute */}
            <Route path="/edit" element={<PrivateRoute element={<Edit />} />}/>
            <Route path="/chatPage"element={<PrivateRoute element={<ChatPage />} />}/>
            <Route path="/GoodsAndServicesPage" element={<PrivateRoute element={<GoodsAndServicesPage />} />} />
            <Route path="/MarketPlace" element={<PrivateRoute element={<MarketPlace />} />} />

          </Routes> 
        </Router>
      </div>
    );
  }

  export default Routing;
