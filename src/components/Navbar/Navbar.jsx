// Navbar.js
import React, { useState } from 'react';
import NavbarContent from './Navbar.content.jsx';
import './Navbar.css'; // Import the custom CSS file

const Navbar = () => {
  // State for handling dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const collapseNavbar = () => {
    setIsCollapsed(false);
  } 


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <NavbarContent

      toggleNavbar={toggleNavbar}
      isCollapsed={isCollapsed}
      collapseNavbar={collapseNavbar}
      toggleDropdown={toggleDropdown}
      isDropdownOpen={isDropdownOpen}
      closeDropdown={closeDropdown}
    />
  );
};

export default Navbar;
