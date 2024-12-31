import React, { useState, useEffect, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import ProfileNavbar from '../../components/ProfileNavbar';

// Custom Alert Component
const Alert = ({ type, message }) => {
  return (
    <div className={`p-4 rounded-lg mb-4 ${
      type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
      'bg-green-50 text-green-700 border border-green-200'
    }`}>
      {message}
    </div>
  );
};

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    profileImage: null
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const fileInputRef = useRef(null);

  // ... rest of the state management and handlers remain the same ...
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("userData"));
        const userId = user._id;
        
        console.log('Token:', token);
        console.log('UserId:', userId);
        
        if (!token || !userId) {
          console.log('Missing auth data - redirecting to login');
          // window.location.href = '/login';
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/get_user/${userId}`);
        
        const data = await response.json();
        
        if (data.success) {
          console.log('Fetched user data:', data.userDetails);
          setProfileData({
            fullName: data.userDetails.fullName || '',
            email: data.userDetails.email || '',
            phoneNumber: data.userDetails.phoneNumber || '',
            profileImage: data.userDetails.profileImage || null
          });
        } else {
          console.error('Failed to fetch user data:', data.message);
          showAlert(data.message || 'Failed to load user data', 'error');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showAlert('Failed to load user data', 'error');
        
        // If there's an authentication error, redirect to login
        if (error.status === 401) {
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview image before upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      const formData = new FormData();
      formData.append('profileImage', file);
      uploadPhoto(formData);
    }
  };

  const uploadPhoto = async (formData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const userId = user._id;
      
      // Add token to formData if needed by your backend
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/user/update_user_image/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProfileData(prev => ({ ...prev, profileImage: data.profileImage }));
        showAlert('Profile photo updated successfully', 'success');
        
        // Update the userData in localStorage with new profile image
        const updatedUserData = { ...user, profileImage: data.profileImage };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
      } else {
        showAlert(data.message || 'Failed to update profile photo', 'error');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      showAlert('Failed to upload photo', 'error');
    } finally {
      setLoading(false);
      setSelectedImage(null); // Reset selected image preview after upload attempt
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('userData');
      
      if (!token || !userDataString) {
        window.location.href = '/login';
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData._id;

      const response = await fetch(`http://localhost:5000/api/user/update_user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber
        }),
      });

      const data = await response.json();
      if (data.success) {
        showAlert('Profile updated successfully', 'success');
      } else {
        showAlert('Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showAlert('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <div className="lg:h-[90.6vh] bg-gray-50 flex">
      <ProfileNavbar />

      <div className="flex-1 flex items-center justify-start p-8">
        <div className="max-w-3xl w-full ml-12 bg-white rounded-xl shadow-lg p-8">
          {alert.show && (
            <Alert type={alert.type} message={alert.message} />
          )}

          <h1 className="text-2xl font-bold mb-8">Account Details</h1>

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-green-500 transition-colors overflow-hidden"
                disabled={loading}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected Profile"
                    className="w-full h-full object-cover"
                  />
                ) : profileData.profileImage ? (
                  <img
                    src={`http://localhost:5000/profiles/${profileData.profileImage}`}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-green-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center min-w-[120px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update'}
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
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