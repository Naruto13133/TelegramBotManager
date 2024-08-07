import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthStore } from './Redux/AuthSlice/LogInUserStore.js'; // Assuming correct path
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import About from './About.jsx';
import NavBar from './Navbar.jsx';
import store from './Redux/Store/ConfigureStore.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <NavBar />  {/* Render NavBar before Routes to ensure it's always visible */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Renders Home component for root path */}
          <Route path="/about" element={<About />} />  {/* Renders About component for /about path */}
          <Route path="/products" element={<h1>Testing</h1>} />
        </Routes>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
  
);
