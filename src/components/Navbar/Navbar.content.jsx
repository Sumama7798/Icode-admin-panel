import React from 'react';
import {
  FolderDot, LogOut, Settings, ChevronDown, ChevronLeft, ChevronRight,
  Gauge, Users, User, Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserHook } from '../../hooks/useUserHook';
import toast from 'react-hot-toast';
import js from '@eslint/js';

const NavbarContent = ({ toggleDropdown, isDropdownOpen, closeDropdown, toggleNavbar, isCollapsed }) => {
  
  const navigate = useNavigate();
  const { logout } = useUserHook();


  const handleLogout = async () => {
    try {
      await logout(); // Ensure the logout function is awaited if it's asynchronous
      toast.success('Logout successful');
      navigate('/login'); // Navigate after successful logout
    } catch (error) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  return (
    <header className={`navbar position-relative ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="container flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="logo flex items-center">
          <FolderDot className="mr-2 w-8 h-8 font-bold" />
          {!isCollapsed && <span>Admin Panel</span>}
        </Link>

        {/* Collapse Button */}
        <button
          onClick={toggleNavbar}
          className="collapse-btn ml-2 mr-2 p-2 bg-gray-800 text-white rounded-md"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex flex-col justify-between items-start mt-8 space-y-4">
        
        {/* Dashboard */}
        <Link to="/" className="home-btn flex items-center">
          <Gauge className="mr-2 w-8 h-8 font-bold" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        {/* Dropdown for Create Page */}
        <div className="relative">
          <button onClick={toggleDropdown} className="create-page-btn flex items-center">
            <Layers className="mr-2 w-8 h-8 font-bold" />
            {!isCollapsed && <span>Create Page <ChevronDown size={30} className="ml-2" /></span>}
          </button>

          {isDropdownOpen && (
            <div
              className="z absolute top-full left-full mt-2 w-60 bg-gray-800 shadow-lg rounded-md"
              onMouseLeave={closeDropdown}
            >
              {[
                { to: '/editHomePage', text: 'HomePage' },
                { to: '/editAboutPage', text: 'AboutPage' },
                { to: '/editBlogPage', text: 'BlogPage' },
                { to: '/editServicesPage', text: 'ServicesPage' },
                { to: '/editContactPage', text: 'ContactPage' },
                { to: '/editFooter', text: 'Footer' }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="dropdown-item px-1 py-4 hover:text-emerald-400 transition duration-300 ease-in-out flex items-center p-3"
                >
                  <li>{item.text}</li>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SuperAdmin Only Links */}
        {json.parse(localStorage.getItem('user'))?.role === "superAdmin" && (
          <Link to="/manage-users" className="messages-btn flex items-center">
            <Users  className="mr-2 w-8 h-8 font-bold" />
            {!isCollapsed && <span>Manage Users</span>}
          </Link>
        )}

        {/* Profile */}
        <Link to="/profile" className="about-us-btn flex items-center">
          <User className="mr-2 w-8 h-8 font-bold" />
          {!isCollapsed && <span>Profile</span>}
        </Link>

        {/* Settings */}
        <Link to="/settings" className="settings-dropdown-btn flex items-center">
          <Settings className="mr-2 w-8 h-8 font-bold" />
          {!isCollapsed && <span>Settings</span>}
        </Link>

        {/* Logout */}
        <button onClick={handleLogout} className="logout-btn mt-auto flex items-center">
          <LogOut className="mr-2 w-8 h-8 text-red-500 hover:text-emerald-400" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </button>
      </nav>
    </header>
  );
};

export default NavbarContent;
