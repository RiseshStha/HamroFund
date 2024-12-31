import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileNavbar = () => {
  const location = useLocation(); // Get the current path

  const menuItems = [
    { id: 1, label: 'Account', path: '/profile' },
    { id: 2, label: 'My Campaigns', path: '/published-campaigns' },
    { id: 3, label: 'My Contributions', path: '/my-contributions' },
  ];

  return (
    <div className="lg:h-[86vh] bg-white flex lg:ml-2 lg:mt-0">
      {/* Sidebar with enhanced visibility */}
      <div className="w-64 p-8 bg-white shadow-xl border-r border-gray-200 rounded-xl">
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full block text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-green-50 text-green-600 border-2 border-green-500 shadow-sm"
                  : "text-gray-600 border-2 border-transparent hover:bg-green-50 hover:border-green-400 hover:text-green-600 hover:shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileNavbar;
