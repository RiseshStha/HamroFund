import React, { useEffect, useState } from "react";
import { UserCircle, X, Menu, Home, Search, HelpCircle, LogOut, User, Settings, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

// Logout Confirmation Dialog
const AlertDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl transform transition-all">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const initialIsLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        const user = JSON.parse(userDataStr);
        setUserData(user);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [showMobileMenu]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleStartACampaign = () => {
    if (token) {
      return navigate("/campaignform_1");
    }
    return navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setShowLogoutDialog(false);
    setUserData(null);
    window.location.href = '/login';
  };

  const ProfileIcon = () => {
    if (userData?.profileImage) {
      return (
        <img
          src={`http://localhost:5000/profiles/${userData.profileImage}`}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-green-400 shadow-md hover:border-green-700 transition-colors"
        />
      );
    }
    return <UserCircle size={48} className="text-green-700 p-1 rounded-full border-2 border-gray-100 shadow-md hover:border-green-600 transition-colors" />;
  };

  const MenuItem = ({ icon: Icon, text, onClick, to }) => {
    const content = (
      <div className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700">{text}</span>
      </div>
    );

    return to ? (
      <Link to={to} onClick={onClick} className="block">
        {content}
      </Link>
    ) : (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  };

  const ProfileMenuItem = ({ icon: Icon, text, onClick, danger }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-2.5 hover:bg-gray-50 transition-colors ${
        danger ? 'text-red-600 hover:text-red-700' : 'text-gray-700'
      }`}
    >
      <Icon className={`w-4 h-4 mr-3 ${danger ? 'text-red-600' : 'text-gray-500'}`} />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );

  return (
    <div className="bg-white shadow-sm">
      {/* Main Navigation */}
      <div className="mx-auto px-4 md:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-20" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-14">
            <button
              onClick={handleStartACampaign}
              className="px-10 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Start a Campaign
            </button>
            <div className="flex items-center space-x-14">
              <Link to="/search" className="text-black hover:text-gray-600 transition-colors">
                Campaigns
              </Link>
              <Link to="/how-it-works" className="text-black hover:text-gray-600 transition-colors">
                How it works
              </Link>
              {isLoggedIn ? (
                <div className="relative profile-menu-container">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center"
                  >
                    <ProfileIcon />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-200 z-[60]">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-medium text-gray-900">{userData?.fullName}</div>
                        <div className="text-sm text-gray-500">{userData?.email}</div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <ProfileMenuItem
                          icon={User}
                          text="View Profile"
                          onClick={() => {
                            navigate("/profile");
                            setShowProfileMenu(false);
                          }}
                        />
                        <ProfileMenuItem
                          icon={Settings}
                          text="Settings"
                          onClick={() => {
                            navigate("/settings");
                            setShowProfileMenu(false);
                          }}
                        />
                        <ProfileMenuItem
                          icon={Bell}
                          text="Notifications"
                          onClick={() => {
                            navigate("/notifications");
                            setShowProfileMenu(false);
                          }}
                        />
                      </div>
                      
                      {/* Logout Section */}
                      <div className="border-t border-gray-100 pt-2">
                        <ProfileMenuItem
                          icon={LogOut}
                          text="Logout"
                          onClick={handleLogoutClick}
                          danger
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="text-green-700 hover:text-green-800 transition-colors"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden p-2"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[50] transition-opacity duration-300 md:hidden ${
          showMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowMobileMenu(false)}
      >
        {/* Mobile menu panel */}
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {isLoggedIn && (
              <div className="flex items-center space-x-3">
                <ProfileIcon />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{userData?.fullName}</p>
                  <p className="text-gray-500">{userData?.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="py-2 divide-y divide-gray-100">
            <div className="py-2">
              <MenuItem
                icon={Home}
                text="Home"
                to="/"
                onClick={() => setShowMobileMenu(false)}
              />
              <MenuItem
                icon={Search}
                text="Campaigns"
                to="/search"
                onClick={() => setShowMobileMenu(false)}
              />
              <MenuItem
                icon={HelpCircle}
                text="How it works"
                to="/how-it-works"
                onClick={() => setShowMobileMenu(false)}
              />
            </div>

            {isLoggedIn ? (
              <div className="py-2">
                <MenuItem
                  icon={User}
                  text="Profile"
                  to="/profile"
                  onClick={() => setShowMobileMenu(false)}
                />
                <MenuItem
                  icon={LogOut}
                  text="Logout"
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogoutClick();
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <Link
                  to="/signup"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full px-6 py-3 text-center text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full px-6 py-3 mt-3 text-center text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Campaign button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
            <button
              onClick={() => {
                handleStartACampaign();
                setShowMobileMenu(false);
              }}
              className="w-full px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start a Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
      />
    </div>
  );
};

export default Navbar;