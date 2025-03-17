
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/CreditDisplay';
import { HeyGenAvatar } from '@/services/heygenService';

interface AvatarPanelProps {
  credits: number;
}

const AvatarPanel = ({ credits }: AvatarPanelProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<HeyGenAvatar | null>(null);
  
  useEffect(() => {
    // Load selected avatar from localStorage
    const storedAvatar = localStorage.getItem('selected_avatar');
    if (storedAvatar) {
      try {
        setSelectedAvatar(JSON.parse(storedAvatar));
      } catch (e) {
        console.error("Failed to parse stored avatar", e);
      }
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <CreditDisplay credits={credits} />
      
      <div className="glass-card p-5 space-y-4">
        <h2 className="text-lg font-medium text-slate-900">Selected Avatar</h2>
        
        <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden">
          <img 
            src={selectedAvatar?.image_url || "https://randomuser.me/api/portraits/women/1.jpg"} 
            alt="Selected Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          {selectedAvatar && (
            <div className="flex flex-wrap gap-1 mb-3">
              {selectedAvatar.gender && (
                <span className="inline-block text-xs font-medium bg-sky-100 text-sky-700 rounded-full px-2 py-0.5">
                  {selectedAvatar.gender}
                </span>
              )}
              {selectedAvatar.style && (
                <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">
                  {selectedAvatar.style}
                </span>
              )}
              {selectedAvatar.ethnicity && (
                <span className="inline-block text-xs font-medium bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                  {selectedAvatar.ethnicity}
                </span>
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full button-hover-effect"
            asChild
          >
            <Link to="/avatars">
              Change Avatar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPanel;
