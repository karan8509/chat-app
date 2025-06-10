import React from 'react';
import { NavLink,  } from 'react-router-dom';

const HomePages = () => {

    const user = true; // Example condition to check if the user is logged in or not

  return (
    <div className="relative">
      {/* Icon positioned at the top-right corner */}
      <div className="absolute top-5 right-5 text-2xl">
        {/* Example of Font Awesome Icon, replace it with your desired icon */}
        <i className="fas fa-home">kjjjjjjjjj</i>
      </div>

      {/* Centered Signup Links */}
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
            to="/signupUser"
            // className="text-white text-lg mb-4 hover:text-yellow-500 transition-colors"
          >
            Signupp
          </NavLink>
        )}
      </div>

    
    </div>
  );
};

export default HomePages;
