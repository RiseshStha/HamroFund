import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { getLatestCampaignsApi } from "../../apis/Api";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const user = JSON.parse(userDataStr);
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    const fetchLatestCampaigns = async () => {
      try {
        const response = await getLatestCampaignsApi();
        const formattedCampaigns = response.data.campaigns.map((campaign) => ({
          id: campaign._id,
          title: campaign.title,
          author: campaign.creator?.fullName || "Anonymous",
          raised: campaign.raisedAmount || 0,
          goal: campaign.goal,
          image: campaign.image,
        }));
        setCampaigns(formattedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCampaigns();
  }, []);

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/400/200";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[80vh] sm:h-[90vh] lg:h-[90.6vh]">
          <img
            src="https://www.ideaplotting.com/wp-content/uploads/2017/12/tips-crowdfunding.jpeg"
            alt="Crowdfunding Hero"
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 sm:p-8 lg:px-12 lg:pb-20 lg:mb-8">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Crowdfunding for Nepal
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-200">
                HamroFund: Let's fulfill dreams and build the future
              </p>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl">
                Start your campaign easily — with simple tools, you can create a great story, 
                set your goals, and share it with others in no time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Campaigns Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
            Latest Campaigns
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow 
                  duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                >
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={getImageUrl(campaign.image)}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/400/200";
                      }}
                    />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-3">By {campaign.author}</p>
                    
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`
                          }}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          Rs {campaign.raised.toLocaleString()}
                        </span>{' '}
                        raised of Rs {campaign.goal.toLocaleString()}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (token) {
                            navigate(`/payment/${campaign.id}`);
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="w-full bg-green-600 text-white py-3 rounded-lg 
                        hover:bg-green-700 transition-colors font-medium"
                      >
                        Contribute
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/search")}
              className="text-green-600 hover:text-green-700 font-medium text-lg 
              hover:underline transition-colors"
            >
              View More →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;