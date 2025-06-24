import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfileHook } from "../hooks/useProfileHook";

const ProfilePage = ({ userId }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const { getUserProfile, user, setUser, updateProfile, updatePassword } = useProfileHook();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await getUserProfile(userId); // Fetch user data via the store (no need to await the result here)
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error("Failed to fetch user profile");
      }
    };
    fetchUserProfile();
  }, [userId, getUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(userId, user); // Use the store action to update the profile
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);  // Exit editing mode
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    }
  };

  const handleSavePassword = async () => {
    try {
      await updatePassword(userId, {currentPassword: user.currentPassword, newPassword: user.newPassword}); // Use the store action to update the password
      if (user.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
        
      }
      else if (user.newPassword == user.currentPassword) {
        toast.error("New password cannot be the same as the current password");
        return;
      }
      toast.success("Password updated successfully");
      setIsEditingPassword(false);  // Exit editing mode
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;  // Show loading state while fetching user data
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">{user.name.toUpperCase()}</h1>
        </div>

        {/* Profile Details */}
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            {isEditingProfile ? (
              <input
                type="text"
                name="name"
                value={user.name || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-lg">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            {isEditingProfile ? (
              <input
                type="email"
                name="email"
                value={user.email || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-lg">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
          
              <p className="mt-1 text-lg">{user.role}</p>
            
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end text-black space-x-4">
          {isEditingProfile ? (
            <>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-emerald-500 text-black rounded-md hover:bg-emerald-600"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="px-4 py-2 bg-emerald-500 text-black rounded-md hover:bg-emerald-600"
            >
              Edit Profile
            </button>

            
          )}
        </div>



        <>
          {isEditingPassword ? (
          <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
          type="password"
          name="currentPassword"
          placeholder="Enter your current password"
         onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
       </div>
          ) : (
         ""
          )}
        </>

        
        <>
          {isEditingPassword ? (
          <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
          type="password"
          name="newPassword"
          placeholder="Enter your new password"
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-800 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
       </div>
          ) : (
         ""
          )}
        </>



        <div className="mt-8 flex justify-end text-black space-x-4">
          {isEditingPassword ? (
            <>
              <button
                onClick={() => setIsEditingPassword(false)}
                className="px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="px-4 py-2 bg-emerald-500 text-black rounded-md hover:bg-emerald-600"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingPassword(true)}
              className="px-4 py-2 bg-emerald-500 text-black rounded-md hover:bg-emerald-600"
            >
              Change Password
            </button>

            
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
