import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePages = () => {
  const user = true; 
  return (
    <div className="bg-gray-900 h-screen text-white flex justify-center items-center relative">
      

      <div className="flex flex-col items-center">
        {user ? (
          <NavLink
            to="/signupUser"
            className="text-white text-lg mb-4 hover:text-yellow-500 transition-colors"
          >
            Signup
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="text-white text-lg mb-4 hover:text-yellow-500 transition-colors"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default HomePages;
