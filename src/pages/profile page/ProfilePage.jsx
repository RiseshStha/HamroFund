import React, { useState, useEffect, useRef } from 'react';
import { Camera, Loader2, Info } from 'lucide-react';
import ProfileNavbar from '../../components/ProfileNavbar';

// Custom Alert Component
const Alert = ({ message, type }) => {
  return (
    <div className={`${
      type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
    } border rounded-lg p-4 mb-6 flex items-center gap-3`}>
      <Info className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

const ProfilePage = () => {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Fetch User Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("userData"));
        const userId = user._id;
        
        if (!token || !userId) {
          console.log('Missing auth data - redirecting to login');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/get_user/${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setProfileData({
            fullName: data.userDetails.fullName || '',
            email: data.userDetails.email || '',
            phoneNumber: data.userDetails.phoneNumber || '',
            profileImage: data.userDetails.profileImage || null
          });
        } else {
          showAlert(data.message || 'Failed to load user data', 'error');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showAlert('Failed to load user data', 'error');
        
        if (error.status === 401) {
          window.location.href = '/login';
        }
      }
    };

    fetchUserData();
  }, []);

  // Alert Handler
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Photo Upload Handlers
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      setSelectedImage(null);
    }
  };

  // Profile Update Handler
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

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  return (
    <div className="lg:h-[89.6vh] bg-gray-50">
      <div className="relative flex w-full pt-4">
        <ProfileNavbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        <div className="flex-1 px-4 max-md:py-7 lg:px-8">
          <div className="w-full bg-white rounded-xl shadow-lg px-4 lg:px-8 py-4">
            {alert.show && (
              <Alert type={alert.type} message={alert.message} />
            )}

            <h1 className="text-2xl font-bold mb-7">Account Details</h1>

            {/* Profile Image Section */}
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
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-green-500 transition-colors overflow-hidden"
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
                      <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Form Fields */}
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

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-6 lg:px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center min-w-[120px]"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update'}
                </button>
                {/* <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-6 lg:px-8 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;