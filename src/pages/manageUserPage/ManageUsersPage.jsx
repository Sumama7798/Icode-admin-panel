import React, { useState, useEffect } from 'react';
import { useAdminHook } from '../../hooks/useAdminHook';
import { motion } from 'framer-motion';
import EditUser from './EditUser';
import { toast } from 'react-hot-toast';

const ManageUsersPage = () => {
  const { getAllUsers, users, deleteUser } = useAdminHook();
  const [openUserId, setOpenUserId] = useState(null);

  // Fetch Users on Component Mount
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleEditClick = (userId) => {
    setOpenUserId(userId);
  };

  const handleCloseModal = () => {
    setOpenUserId(null);
  };

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (!isConfirmed) return;
  
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      getAllUsers(); // Refresh state instead of reloading the page
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className='pl-auto min-h-screen relative bg-gray-900 text-white overflow-hidden'>
      <div className='relative left-auto container'>
        <motion.div
          className='text-4xl font-bold mb-8 mt-4 text-center text-emerald-400'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Manage Users
        </motion.div>

        <motion.div
          className='mt-8 sm:mx-auto sm:w-[800px]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800 w-full">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                          Role
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                              <span className="ml-4 text-sm font-medium text-white">
                                {user.name}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                                onClick={() => handleEditClick(user._id)}
                              >
                                Edit
                              </button>
                              {openUserId === user._id && (
                                <EditUser
                                  open={true}
                                  onClose={handleCloseModal}
                                  userId={user._id}
                                  initialData={user}
                                />

                                
                              )}

                              
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleDelete(user._id)} 
                            className='flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'>
                                Delete
                              </button>

                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-gray-400">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUsersPage;