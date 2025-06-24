import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, UserRound , LogOut, Settings } from 'lucide-react';
import { useUserHook } from '../../hooks/useUserHook';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {logout} = useUserHook();


    const handleLogout = async () => {
      try {
        await logout(); // Ensure the logout function is awaited if it's asynchronous
        toast.success('Logout successful');
        navigate('/login'); // Navigate after successful logout
      } catch (error) {
        toast.error(error.message || 'Failed to logout');
      }
    };

    const ToggleDropdown = () => {
        setIsOpen(!isOpen);
      }


  return (
    <div className='bg-gray-800 box-border h-20 flex items-center justify-between'>
        <h1 className="text-2xl font-bold text-gray-500 inline-block mr-9 ml-auto">Welcome to the Admin Panel</h1>
        
        <div className='inline-block right-0 ml-auto mr-6'>
          
          </div>  

          <div>
          <img onClick={ToggleDropdown}  className="inline-block cursor-pointer right-0 size-14 rounded-full ring-2 mr-3 ml-auto ring-gray-700 hover:ring-emerald-400 transition duration-300 ease-in-out"
          src="https://static.vecteezy.com/system/resources/previews/024/514/435/non_2x/3d-icon-of-men-profile-people-free-png.png" alt=""/>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 bg-opacity-80 shadow-lg rounded z-50">
              <div className="container mx-auto px-4">
                <div className="mb-4">
                  <h3 className="font-bold text-lg flex items-center p-3">Admin Panel</h3>
                  <ul className="mt-auto">
                    <li><Link to='/profile' className='hover:text-emerald-400 transition duration-300 ease-in-out flex items-center p-3'><UserRound /> Profile</Link></li>
                    <li><Link to='/settings' className='hover:text-emerald-400 transition duration-300 ease-in-out flex items-center p-3'> <Settings />Settings</Link></li>
                    <li><Link to='/login' onClick={handleLogout} className='hover:text-emerald-400 transition duration-300 ease-in-out flex items-center p-3'> <LogOut />Logout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          </div>
        
      </div>
  )
}

export default Header