import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const PublishedCampaigns = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 1, label: 'Account', active: false },
    { id: 2, label: 'Campaigns', active: true },
    { id: 3, label: 'Contributions', active: false },
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Chiya Hub',
      image: '/api/placeholder/400/200',
      createdAt: '4 weeks ago',
    },
    {
      id: 2,
      title: 'Chiya Hub',
      image: '/api/placeholder/400/200',
      createdAt: '4 weeks ago',
    },
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
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-8">Published Campaigns</h1>

            {/* Campaign Cards */}
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div 
                  key={campaign.id} 
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Campaign Image */}
                    <div className="w-full md:w-48">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-24 object-cover rounded-lg bg-gray-900"
                      />
                    </div>

                    {/* Campaign Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 mb-4">Campaigns created {campaign.createdAt}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button className="px-8 py-2 border border-gray-200 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors">
                          Edit
                        </button>
                        <button className="px-8 py-2 border border-gray-200 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
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

export default PublishedCampaigns;