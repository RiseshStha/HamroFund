import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import Footer from "../../components/Footer";
import { searchCampaignsApi } from "../../apis/Api";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

const SearchCampaigns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("latest");
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6
  });
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem('token');

  // Debounced search function
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      fetchCampaigns(query);
    }, 500),
    []
  );

  // Fetch campaigns with current filters
  const fetchCampaigns = async (searchTerm = searchQuery) => {
    try {
      if (!isSearching) setLoading(true);
      const response = await searchCampaignsApi({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchTerm,
        category,
        sortBy
      });

      if (response.data.success) {
        setCampaigns(response.data.campaigns);
        setPagination(response.data.pagination);
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/400/200";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  // Reset pagination when category or sort changes (but not search)
  useEffect(() => {
    window.scrollTo(0, 0);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchCampaigns();
  }, [category, sortBy]);

  // Fetch campaigns when page changes
  useEffect(() => {
    if (pagination.currentPage > 1) {
      fetchCampaigns();
    }
  }, [pagination.currentPage]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Search Campaigns</h1>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section with Conditional Rendering */}
          <div className="min-h-[400px]">
            {/* Loading State */}
            {loading && !isSearching && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              </div>
            )}

            {/* No Results Message */}
            {!loading && campaigns.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No campaigns found.</p>
              </div>
            )}

            {/* Campaigns Grid */}
            {!loading && campaigns.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
                    onClick={() => navigate(`/campaign/${campaign._id}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={getImageUrl(campaign.image)}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg line-clamp-1">{campaign.title}</h3>
                      <p className="text-gray-600 line-clamp-1">By {campaign.creator.fullName}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Rs {campaign.raisedAmount.toLocaleString()} raised out of Rs{" "}
                        {campaign.goal.toLocaleString()}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((campaign.raisedAmount / campaign.goal) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (token) {
                            navigate(`/payment/${campaign._id}`);
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition-colors"
                      >
                        Contribute
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 mb-6">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: index + 1 }))}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    pagination.currentPage === index + 1
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchCampaigns;