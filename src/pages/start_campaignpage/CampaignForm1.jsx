import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignProgressBar from '../../components/CampaignProgressBar';

const CampaignForm1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    province: '',
    goal: '10000'
  });

  const clearAllData = () => {
    [
      'campaign_category',
      'campaign_province',
      'campaign_goal',
      'campaign_title',
      'campaign_description',
      'campaign_endDate'
    ].forEach(key => localStorage.removeItem(key));

    [
      'campaign_image_preview',
      'campaign_image_name',
      'campaign_image_type'
    ].forEach(key => sessionStorage.removeItem(key));

    setFormData({
      category: '',
      province: '',
      goal: '10000'
    });
  };



  useEffect(() => {
    // Load saved data from localStorage if exists
    const savedCategory = localStorage.getItem('campaign_category');
    const savedProvince = localStorage.getItem('campaign_province');
    const savedGoal = localStorage.getItem('campaign_goal');

    if (savedCategory || savedProvince || savedGoal) {
      setFormData({
        category: savedCategory || '',
        province: savedProvince || '',
        goal: savedGoal || '10000'
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    localStorage.setItem(`campaign_${name}`, value);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.province || !formData.goal) {
      alert('Please fill all fields');
      return;
    }
    navigate("/campaignform_photo_upload");
  };

  const handleCancel = () => {
    // Clear localStorage
    clearAllData();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center lg:h-[89.4vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <CampaignProgressBar currentStep={1}/>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              What best describes your fundraiser?
            </label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-green-500 rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Select an Option</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="charity">Charity</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Select Province
            </label>
            <select 
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full p-3 border border-green-500 rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Select an Option</option>
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province3">Province 3</option>
              <option value="province4">Province 4</option>
              <option value="province4">Province 5</option>
              <option value="province4">Province 6</option>
              <option value="province4">Province 7</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              How much would you like to raise?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full p-3 pl-12 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleCancel}
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CampaignForm1;