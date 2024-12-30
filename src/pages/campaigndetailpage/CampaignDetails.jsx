import React from 'react';
import { User } from 'lucide-react';
import Footer from '../../components/Footer';

const CampaignDetails = () => {
  return (
    <>
        <div className="lg:h-[90.6vh] bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8">Chiya Hub</h1>
            
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src="/api/placeholder/1200/600"
                alt="Chiya Hub"
                className="w-full h-full object-cover bg-black"
              />
            </div>

            <div className="flex items-center gap-4 py-6 border-b">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-lg">
                <span className="font-semibold">Sijan Shrestha</span>
                <span className="text-gray-600"> is organizing this campaign</span>
              </div>
            </div>

            <div className="py-6 border-b text-gray-600 text-lg">
              <p>Created 4 week ago</p>
            </div>

            <div className="py-6 space-y-3">
              <h2 className="text-2xl font-semibold">Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ChiyaHub is the place where people enjoy the delicious a cup of tea
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-3">Organizer</h2>
              <p className="text-gray-600 text-lg">Sijan Shrestha</p>
              <p className="text-gray-600 text-lg">Province 2</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Rs 5,000 raised</h2>
                <div className="flex justify-between text-lg text-gray-600 mt-2">
                  <span>Rs 50,000 goal</span>
                  <span>2 contributors</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-400 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>

              <button className="w-full bg-orange-400 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors">
                Contribute the Project
              </button>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contributors</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-lg">Anonymous</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-lg">Sijan Shrestha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CampaignDetails;