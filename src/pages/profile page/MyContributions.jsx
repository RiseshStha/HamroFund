import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MyContributions = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 1, label: 'Account', active: false },
    { id: 2, label: 'Campaigns', active: false },
    { id: 3, label: 'Contributions', active: true },
  ];

  const contributions = [
    {
      id: 1,
      title: 'Chiya Hub',
      amount: 100,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-gray-900'
    },
    {
      id: 2,
      title: 'Gaming Hub',
      amount: 100,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'BargainBazzar',
      amount: 100,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-purple-900'
    },
    {
      id: 4,
      title: 'Note Take',
      amount: 100,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-yellow-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white shadow-sm">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-green-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className={`
          ${isMobileMenuOpen ? 'block' : 'hidden'} 
          md:block 
          w-64 min-h-screen bg-white shadow-sm p-6
        `}>
          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`w-full text-left px-4 py-2 rounded-lg border ${
                  item.active 
                    ? 'text-green-600 border-green-600' 
                    : 'text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl">
            <h1 className="text-2xl font-bold mb-8">My Contributions</h1>

            {/* Contributions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributions.map(contribution => (
                <div 
                  key={contribution.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Campaign Image */}
                  <div className={`h-48 ${contribution.bgColor} flex items-center justify-center`}>
                    <img
                      src={contribution.image}
                      alt={contribution.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Contribution Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{contribution.title}</h3>
                    <p className="text-gray-600">
                      Sijan have contributed Rs {contribution.amount} in {contribution.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContributions;