import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const initialIsLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [showMobileMenu, setShowmobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);

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

  const handleStartACampaign = () => {
    if (userData?.profileImage) {
      return (
        navigate("/campaignform_1")
      );
    }
    return navigate("/login");
    
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setUserData(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showProfileMenu]);

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

  return (
    <>
      <div className="relative top-0 left-0 w-full z-10 bg-white">
        <div className="mx-auto flex justify-between items-center py-4 px-6 md:px-12 lg:px-16 bg-transparent">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="HamroFund" className="w-16"/>
          </Link>

          <div className="flex lg:gap-32 gap-8 items-center">
            <button
              onClick={handleStartACampaign} 
              className="hidden md:block px-10 py-2 bg-green-600 text-white rounded-md">
              Start a Campaign
            </button>
            <div className="hidden md:flex lg:gap-32 gap-8 items-center">
              <Link
                to="/search"
                className="cursor-pointer hover:text-gray-400 text-black"
              >
                Campaigns
              </Link>
              <Link
                to="/how-it-works"
                className="cursor-pointer hover:text-gray-400 text-black"
              >
                How it works
              </Link>
              {isLoggedIn ? (
                <div className="relative profile-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProfileMenu(!showProfileMenu);
                    }}
                    className="flex items-center gap-32 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <ProfileIcon />
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="cursor-pointer hover:text-gray-400 text-green-700"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>

          <img
            onClick={() => setShowmobileMenu(true)}
            src=""
            className="md:hidden w-7 cursor-pointer"
            alt="menu icon"
          />
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            showMobileMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 overflow-hidden
            bg-white transition-all`}
        >
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              onClick={() => {
                setShowmobileMenu(false);
              }}
              src=""
              className="w-6"
              alt="X"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <button
              onClick={() => {
                setShowmobileMenu(false)
                handleStartACampaign()
              }}
              className="bg-green-700 px-8 py-2 rounded-full text-white"
            >
              Start a Campaign
            </button>
            <Link
              onClick={() => setShowmobileMenu(false)}
              to="/how-it-works"
              className="px-4 py-2 rounded-full inline-block"
            >
              How it works
            </Link>
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <ProfileIcon />
                </div>
                <Link
                  onClick={() => setShowmobileMenu(false)}
                  to="/profile"
                  className="px-4 py-2 rounded-full inline-block"
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setShowmobileMenu(false)}
                  to="/my-campaigns"
                  className="px-4 py-2 rounded-full inline-block"
                >
                  My Campaigns
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowmobileMenu(false);
                  }}
                  className="px-4 py-2 rounded-full inline-block text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setShowmobileMenu(false)}
                to="/signup"
                className="px-4 py-2 rounded-full inline-block"
              >
                Sign Up
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;