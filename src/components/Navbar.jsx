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

  const handleStartACampaign = () =>{
    navigate("/campaignform_1");
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowProfileMenu(false);
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

  return (
    <>
      <div className="relative top-0 left-0 w-full z-10 bg-white">
        <div className="mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-20 bg-transparent">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="HamroFund" className="w-16"/>
          </Link>

          <div className="flex gap-20 items-center">
            <button
            onClick={handleStartACampaign} 
            className="hidden md:block px-10 py-2 bg-green-600 text-white rounded-md">
              Start a Campaign
            </button>
            <div className="hidden md:flex gap-20">
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
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-400 text-green-700"
                  >
                    <UserCircle size={24} />
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/my-campaigns"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Campaigns
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