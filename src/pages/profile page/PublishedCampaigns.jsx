import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, DollarSign, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../../components/ProfileNavbar";
import { getUserCampaignsApi } from "../../apis/Api";

const PublishedCampaigns = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCampaigns = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData?._id) {
          navigate("/login");
          return;
        }
        const response = await getUserCampaignsApi(userData._id);
        if (response.data.success) {
          setCampaigns(response.data.campaigns);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/edit-campaign/${id}`);
  };

  const handleView = (id) => {
    navigate(`/campaign/${id}`);
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/400/200";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      {/* <div className="md:hidden p-4 bg-white shadow-sm">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-green-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div> */}

      <div className="flex pt-4">
        {/* Left Sidebar Navigation */}
        <ProfileNavbar />

        {/* Main Content */}
        <div className="flex-1 p-0 md:px-6">
          {" "}
          {/* Reduced padding */}
          <div className="bg-white rounded-xl shadow-lg px-4 lg:px-6 py-8 mx-2">
            {" "}
            {/* Reduced padding */}
            <div className="max-w-5xl mx-auto">
              {/* Campaign Cards */}
              <div className="grid gap-4">
                {" "}
                {/* Reduced gap */}
                {campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    {" "}
                    {/* Changed to rounded-lg */}
                    <div className="flex flex-col md:flex-row">
                      {/* Campaign Image */}
                      <div className="md:w-56 h-40 md:h-auto relative overflow-hidden">
                        {" "}
                        {/* Reduced width and height */}
                        <img
                          src={getImageUrl(campaign.image)}
                          alt={campaign.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/400/200";
                          }}
                        />
                      </div>

                      {/* Campaign Info */}
                      <div className="flex-1 p-4">
                        {" "}
                        {/* Reduced padding */}
                        <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold mb-2">
                            {campaign.title}
                          </h3>{" "}
                          {/* Reduced text size */}
                          <div className="flex flex-wrap gap-3 mb-3">
                            {" "}
                            {/* Reduced gap and margin */}
                            <div className="flex items-center text-gray-600 text-sm">
                              <span>Rs {campaign.goal.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Tag size={16} className="mr-1" />
                              <span className="capitalize">
                                {campaign.category}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar size={16} className="mr-1" />
                              <span>
                                {new Date(
                                  campaign.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {campaign.description}
                          </p>
                          {/* Action Buttons */}
                          <div className="flex gap-3 mt-auto justify-end">
                            {" "}
                            {/* Added justify-end */}
                            <button
                              onClick={() => handleEdit(campaign._id)}
                              className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors text-sm w-32" // Added fixed width w-32
                            >
                              Edit Campaign
                            </button>
                            <button
                              onClick={() => handleView(campaign._id)}
                              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm w-32" // Added fixed width w-32
                            >
                              View Details
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

export default PublishedCampaigns;
