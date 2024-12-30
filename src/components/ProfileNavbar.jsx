import React from "react";

const ProfileNavbar = () => {

    const menuItems = [
        { id: 1, label: 'Account', active: true },
        { id: 2, label: 'Campaigns', active: false },
        { id: 3, label: 'Contributions', active: false },
      ];
    

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 p-8 border-r border-gray-200">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left px-4 py-2 rounded-lg border ${
                  item.active
                    ? "text-green-600 border-green-600"
                    : "text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;
