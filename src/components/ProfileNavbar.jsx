import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Flag, Heart } from "lucide-react";

const ProfileNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, label: 'Account', path: '/profile', icon: User },
    { id: 2, label: 'My Campaigns', path: '/published-campaigns', icon: Flag },
    { id: 3, label: 'My Contributions', path: '/my-contributions', icon: Heart },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden fixed top-20 left-1 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`
        fixed lg:static 
        inset-y-0 left-0 
        w-64 
        bg-white 
        shadow-xl 
        border-r 
        border-gray-200 
        rounded-xl
        transform 
        transition-transform 
        duration-300 
        ease-in-out
        z-50
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:mr-6
      `}>
        <nav className="p-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  w-full 
                  flex 
                  items-center 
                  px-4 
                  py-3 
                  rounded-lg 
                  transition-all 
                  duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-green-50 text-green-600 border-2 border-green-500 shadow-sm"
                      : "text-gray-600 border-2 border-transparent hover:bg-green-50 hover:border-green-400 hover:text-green-600 hover:shadow-sm"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default ProfileNavbar;