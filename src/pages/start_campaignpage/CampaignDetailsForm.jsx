import React, { useState } from 'react';

const CampaignDetailsForm = () => {
  const [formData, setFormData] = useState({
    title: 'Chiya Hub',
    story: 'Chiya Hub is the place where all friend gather and enjoy the delicious a cup of tea',
    duration: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-black rounded-full">
            3
          </span>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Give your campaign a title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Tell your story
            </label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Duration of a campaign
            </label>
            <input
              type="text"
              name="duration"
              placeholder="dd/mm/yyyy"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="space-x-4">
              <button
                type="button"
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-red-500 hover:bg-gray-50"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignDetailsForm;