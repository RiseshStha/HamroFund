import React from 'react';
import { Search, Facebook, Github } from 'lucide-react';

const SearchCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Gaming Hub',
      author: 'Sujan Kc',
      raised: 50000,
      goal: 100000,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-purple-400'
    },
    {
      id: 2,
      title: 'Chiya Hub',
      author: 'Sijan Shrestha',
      raised: 5000,
      goal: 50000,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-gray-900'
    },
    {
      id: 3,
      title: 'Bargain Bazzar',
      author: 'Riseesh Shrestha',
      raised: 50000,
      goal: 150000,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-purple-900'
    },
    {
      id: 4,
      title: 'Note Take',
      author: 'Paribesh',
      raised: 25000,
      goal: 100000,
      image: '/api/placeholder/400/200',
      bgColor: 'bg-yellow-200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Campaigns</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <select className="w-full p-2 border rounded-lg">
              <option value="ALL">ALL</option>
            </select>
          </div>
          <div className="flex-1">
            <select className="w-full p-2 border rounded-lg">
              <option value="ALL">ALL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className={`h-48 ${campaign.bgColor} flex items-center justify-center text-white`}>
              {campaign.title}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{campaign.title}</h3>
              <p className="text-gray-600">By {campaign.author}</p>
              <p className="text-sm text-gray-500 mt-2">
                Rs {campaign.raised.toLocaleString()} raised out of Rs {campaign.goal.toLocaleString()}
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700">
                Contribute
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-green-600 font-medium mb-4">Hamro Fund</h3>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-blue-600" />
              <Github className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Discover</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Tech & Innovation</li>
              <li>Top-Funded Campaigns</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>hamrofund@gmail.com</li>
              <li>FAQs & Help Center</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchCampaigns;