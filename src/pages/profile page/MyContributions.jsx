import React, { useState } from 'react';
import { Calendar, Tag } from 'lucide-react';
import ProfileNavbar from '../../components/ProfileNavbar';

const MyContributions = () => {
  // Sample data - replace with actual API call
  const contributions = [
    {
      id: 1,
      title: 'Chiya Hub',
      amount: 100,
      description: 'A cozy space for tea lovers to gather and share their passion for unique blends.',
      image: '/api/placeholder/400/200',
      category: 'Food & Beverage',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Gaming Hub',
      amount: 100,
      description: 'Creating an inclusive gaming community with state-of-the-art facilities.',
      image: '/api/placeholder/400/200',
      category: 'Entertainment',
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      title: 'BargainBazzar',
      amount: 100,
      description: 'Your one-stop marketplace for amazing deals and unique finds.',
      image: '/api/placeholder/400/200',
      category: 'Retail',
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      title: 'Note Take',
      amount: 100,
      description: 'Revolutionary note-taking app designed for modern students and professionals.',
      image: '/api/placeholder/400/200',
      category: 'Technology',
      createdAt: '2024-03-25'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex pt-4">
        <ProfileNavbar />
        
        <div className="flex-1 p-0 md:px-6">
          <div className="bg-white rounded-xl shadow-lg px-4 lg:px-6 py-8 mx-2">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold mb-8">My Contributions</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-56 h-40 md:h-auto relative overflow-hidden">
                        <img
                          src={contribution.image}
                          alt={contribution.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold mb-2">
                            {contribution.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex items-center text-gray-600 text-sm">
                              <span>Rs {contribution.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Tag size={16} className="mr-1" />
                              <span className="capitalize">{contribution.category}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar size={16} className="mr-1" />
                              <span>
                                {new Date(contribution.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {contribution.description}
                          </p>
                          <div className="flex gap-3 mt-auto justify-end">
                            <button
                              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm w-60"
                            >
                              View Campaign
                            </button>
                          </div>
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
    </div>
  );
};

export default MyContributions;