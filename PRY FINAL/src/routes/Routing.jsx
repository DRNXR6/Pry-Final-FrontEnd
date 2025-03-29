  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Login from '../pages/Login';
  import Register from '../pages/Register';
  import Home from '../pages/Home';
  import SobreWeb from '../pages/SobreWeb';
  import Contacto from '../pages/contacto';
  import MarketPlace from '../pages/MarketPlace';
  import DetailsPage from '../pages/DetailsPage';
  import Edit from '../pages/Edit';
  import ChatPage from '../pages/ChatPage';
  import GoodsAndServicesPage from '../pages/Goods AndServicesPage';
  import PrivateRoute from '../components/PrivateRoute'; // Importamos el componente PrivateRoute

  function Routing() {
    return (
      <div>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/SobreWeb" element={<SobreWeb />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas con PrivateRoute */}
            <Route
              path="/edit"
              element={<PrivateRoute element={<Edit />} />}
            />
            <Route
              path="/details"
              element={<PrivateRoute element={<DetailsPage />} />}
            />
            <Route
              path="/chatPage"
              element={<PrivateRoute element={<ChatPage />} />}
            />
            <Route
              path="/GoodsAndServicesPage"
              element={<PrivateRoute element={<GoodsAndServicesPage />} />}
            />
            <Route
              path="/MarketPlace"
              element={<PrivateRoute element={<MarketPlace />} />}
            />

          </Routes>
        </Router>
      </div>
    );
  }

  export default Routing;
