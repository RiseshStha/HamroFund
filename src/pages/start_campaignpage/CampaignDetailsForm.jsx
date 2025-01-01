import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaignApi } from '../../apis/Api'; // Adjust path as needed
import CampaignProgressBar from '../../components/CampaignProgressBar';

const CampaignDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Campaign Title',
    description: 'Campaign Description',
    endDate: 'dd/mm/yyyy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage if exists
    const savedTitle = localStorage.getItem('campaign_title');
    const savedDescription = localStorage.getItem('campaign_description');
    const savedEndDate = localStorage.getItem('campaign_endDate');

    if (savedTitle || savedDescription || savedEndDate) {
      setFormData({
        title: savedTitle || '',
        description: savedDescription || '',
        endDate: savedEndDate || ''
      });
    }
  }, []);

  const clearAllData = () => {
    // Clear localStorage items
    [
      'campaign_category',
      'campaign_province',
      'campaign_goal',
      'campaign_title',
      'campaign_description',
      'campaign_endDate'
    ].forEach(key => localStorage.removeItem(key));

    // Clear sessionStorage items
    [
      'campaign_image_preview',
      'campaign_image_name',
      'campaign_image_type'
    ].forEach(key => sessionStorage.removeItem(key));

    // Reset form data
    setFormData({
      title: '',
      description: '',
      endDate: ''
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    localStorage.setItem(`campaign_${name}`, value);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.endDate) {
      alert('Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Create form data
    const finalFormData = new FormData();
    
    // Get saved userData from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Add all form data
    finalFormData.append('creator', userData._id); // Add creator ID explicitly
    finalFormData.append('category', localStorage.getItem('campaign_category'));
    finalFormData.append('province', localStorage.getItem('campaign_province'));
    finalFormData.append('goal', localStorage.getItem('campaign_goal'));
    
    // Convert base64 image back to file and append
    const imagePreview = sessionStorage.getItem('campaign_image_preview');
    const imageName = sessionStorage.getItem('campaign_image_name');
    const imageType = sessionStorage.getItem('campaign_image_type');
    
    if (imagePreview && imageName) {
      const imageBlob = await fetch(imagePreview).then(r => r.blob());
      const imageFile = new File([imageBlob], imageName, { type: imageType });
      finalFormData.append('image', imageFile);
    }
    
    finalFormData.append('title', formData.title);
    finalFormData.append('description', formData.description);
    finalFormData.append('endDate', formData.endDate);

    try {
      const response = await createCampaignApi(finalFormData);
      if (response.data.success) {
        // Clear storage
        ['category', 'province', 'goal'].forEach(key => 
          localStorage.removeItem(`campaign_${key}`)
        );
        ['image_preview', 'image_name', 'image_type'].forEach(key => 
          sessionStorage.removeItem(`campaign_${key}`)
        );
        clearAllData
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
};

  const handlePrevious = () => {
    navigate("/campaignform_photo_upload");
  };

  const handleDiscard = () => {
    // Clear all localStorage
    ['category', 'province', 'goal', 'image', 'title', 'description', 'endDate']
      .forEach(key => localStorage.removeItem(`campaign_${key}`));
      clearAllData();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center lg:h-[89.6vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <CampaignProgressBar currentStep={3}/>
        </div>

        <form className="space-y-6" onSubmit={handlePublish}>
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Campaign end date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-red-500 hover:bg-gray-50"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignDetailsForm;