
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AvatarCard from '@/components/AvatarCard';
import { Search, Filter, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { heygenService, HeyGenAvatar } from '@/services/heygenService';
import { toast } from 'sonner';
// import SignOutButton from "@/components/SignOutButton";

// Filter options
const filterOptions = [
  { name: 'Gender', options: ['Male', 'Female', 'Any'] },
  { name: 'Age Range', options: ['18-30', '30-45', '45+', 'Any'] },
  { name: 'Style', options: ['Professional', 'Casual', 'Corporate', 'Any'] },
  { name: 'Ethnicity', options: ['Diverse', 'Any'] }
];

const Avatars = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [avatars, setAvatars] = useState<HeyGenAvatar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem('heygen_api_key') || ''
  );
  
  const fetchAvatars = async () => {
    setIsLoading(true);
    try {
      if (apiKey) {
        heygenService.setApiKey(apiKey);
        const fetchedAvatars = await heygenService.getAvatars();
        if (fetchedAvatars.length > 0) {
          setAvatars(fetchedAvatars);
          localStorage.setItem('heygen_api_key', apiKey);
        } else {
          // If no avatars returned, show sample avatars
          setAvatars(transformSampleAvatars());
          toast.warning("Could not fetch avatars from HeyGen. Using sample avatars instead.");
        }
      } else {
        // If no API key, use sample avatars
        setAvatars(transformSampleAvatars());
      }
    } catch (error) {
      console.error("Failed to fetch avatars:", error);
      toast.error("Failed to fetch avatars from HeyGen");
      setAvatars(transformSampleAvatars());
    } finally {
      setIsLoading(false);
    }
  };
  
  // Transform sample avatars to match HeyGen format
  const transformSampleAvatars = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: `avatar-${i + 1}`,
      name: `Avatar ${i + 1}`,
      image_url: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      style: i % 3 === 0 ? 'Professional' : 'Casual',
      ethnicity: i % 4 === 0 ? 'Diverse' : undefined,
      age_range: i % 3 === 0 ? '18-30' : i % 3 === 1 ? '30-45' : '45+'
    }));
  };
  
  useEffect(() => {
    // Fetch avatars when component mounts
    fetchAvatars();
  }, []);
  
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };
  
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAvatars();
  };
  
  const toggleFilter = (category: string, option: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (option === 'Any') {
        delete newFilters[category];
      } else {
        newFilters[category] = option;
      }
      return newFilters;
    });
  };
  
  const resetFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };
  
  const filteredAvatars = avatars.filter(avatar => {
    // Search filter
    if (searchQuery && !avatar.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply active filters
    for (const [category, value] of Object.entries(activeFilters)) {
      if (category === 'Gender') {
        if (avatar.gender?.toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      } else if (category === 'Style') {
        if (avatar.style?.toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      } else if (category === 'Ethnicity' && value !== 'Any') {
        if (avatar.ethnicity?.toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      } else if (category === 'Age Range' && value !== 'Any') {
        if (avatar.age_range !== value) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  const handleAvatarSelect = (id: string) => {
    setSelectedAvatar(id);
    // Store selected avatar in localStorage for the creator page
    const selectedAvatarObj = avatars.find(avatar => avatar.id === id);
    if (selectedAvatarObj) {
      localStorage.setItem('selected_avatar', JSON.stringify(selectedAvatarObj));
    }
  };
  
  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4 focus-ring rounded-md px-2 py-1 -ml-2"
              >
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                Back to Home
              </Link>
              
              <h1 className="text-3xl font-bold text-slate-900 mb-3">Select Your Avatar</h1>
              <p className="text-slate-600 max-w-2xl">
                Choose the perfect avatar for your brand's UGC video. Each avatar brings a unique style and personality to help convey your message authentically.
              </p>
            </div>
            {/* <SignOutButton /> */}
          </div>
          
          {/* HeyGen API Key Input */}
          <div className="mb-6">
            <form onSubmit={handleApiKeySubmit} className="glass-card p-4">
              <h3 className="font-medium text-slate-900 mb-2">HeyGen API Key</h3>
              <p className="text-sm text-slate-600 mb-3">Enter your HeyGen API key to fetch real avatars</p>
              <div className="flex gap-3">
                <Input
                  type="password"
                  placeholder="Enter HeyGen API key"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  className="flex-grow"
                />
                <Button type="submit">Fetch Avatars</Button>
              </div>
            </form>
          </div>
          
          {/* Search and filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search avatars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 focus-visible:ring-sky-500"
                />
              </div>
              
              <Button
                variant="outline"
                className={cn(
                  "flex items-center gap-2",
                  getActiveFilterCount() > 0 && "border-sky-200 bg-sky-50 text-sky-700"
                )}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="h-5 w-5 bg-sky-100 rounded-full text-xs flex items-center justify-center font-medium">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </div>
            
            {/* Filter panel */}
            {showFilters && (
              <div className="glass-card p-4 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-slate-900">Filter Avatars</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-sky-600 hover:text-sky-700 focus-ring rounded px-2 py-1"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filterOptions.map((filter) => (
                    <div key={filter.name} className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">{filter.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {filter.options.map((option) => (
                          <button
                            key={option}
                            className={cn(
                              "px-2 py-1 text-xs font-medium rounded-full",
                              activeFilters[filter.name] === option
                                ? "bg-sky-100 text-sky-700"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            )}
                            onClick={() => toggleFilter(filter.name, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Avatar grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-slate-100 animate-pulse rounded-lg aspect-[3/4]"
                />
              ))}
            </div>
          ) : filteredAvatars.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAvatars.map((avatar) => (
                <AvatarCard
                  key={avatar.id}
                  id={avatar.id}
                  name={avatar.name}
                  image={avatar.image_url}
                  tags={[
                    avatar.gender || '', 
                    avatar.style || '', 
                    avatar.ethnicity || ''
                  ].filter(Boolean)}
                  isSelected={selectedAvatar === avatar.id}
                  onSelect={handleAvatarSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-slate-900 mb-2">No avatars found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {/* Next step button */}
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              disabled={!selectedAvatar}
              className="button-hover-effect"
              asChild
            >
              <Link to="/creator">
                Continue to Creator <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatars;
