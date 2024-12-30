import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import ProfileNavbar from '../../components/ProfileNavbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Sijan Shrestha',
    email: 'sijan@gmail.com'
  });

  const menuItems = [
    { id: 1, label: 'Account', active: true },
    { id: 2, label: 'Campaigns', active: false },
    { id: 3, label: 'Contributions', active: false },
  ];

  const handlePhotoUpload = () => {
    console.log('Upload photo clicked');
  };

  const handleUpdate = () => {
    console.log('Update profile clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ProfileNavbar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-12">Account Details</h1>

          {/* Profile Photo */}
          <div className="mb-12 flex justify-center">
            <button
              onClick={handlePhotoUpload}
              className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-green-500 transition-colors"
            >
              <Camera className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add Photo</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleUpdate}
                className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Update
              </button>
              <button
                onClick={handleLogout}
                className="px-8 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;