import React, { useState } from 'react';
import { useAdminHook } from '../../hooks/useAdminHook';
import { X } from 'lucide-react';

const EditUser = ({ open, onClose, userId, initialData }) => {
  const { updateUserRole } = useAdminHook();
  const [role, setRole] = useState(initialData?.role || 'user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!role) {
      setError('Role is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateUserRole(userId, role);
      onClose(); // Close the modal on success
      window.location.reload();
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 min-w-20 flex justify-center items-center 
      transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all 
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} w-full max-w-md`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-red-400 hover:text-white"
          aria-label="Close modal"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit User Role</h2>

        {/* Role Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-600 text-white rounded-lg p-2 mt-4 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:bg-emerald-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditUser;