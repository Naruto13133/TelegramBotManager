import React from 'react';
import { Link } from 'react-router-dom';
import LeftBarForMaps from '../src/component/LeftBar/LeftBarForMaps'

const NavBar = () => {
  return (
    <nav className="fixed  top-0 left-0 w-full z-50 bg-white shadow-md">
      <ul className="flex justify-between px-4 py-2">
        <li>
        <LeftBarForMaps/> 
        </li>
        <li className="text-gray-700 hover:text-blue-500 font-bold">
          New Flow
        </li>
        <li>
          <Link to="/" className="text-gray-700 hover:text-blue-500 font-bold">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-gray-700 hover:text-blue-500 font-bold">
            About
          </Link>
        </li>
        {/* Add more links for other pages as needed */}
      </ul>
    </nav>
  );
};

export default NavBar;
