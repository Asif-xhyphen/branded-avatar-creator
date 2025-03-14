
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CreditDisplay from '@/components/CreditDisplay';

interface AvatarPanelProps {
  credits: number;
  avatarImage?: string;
}

const AvatarPanel = ({ credits, avatarImage = "https://randomuser.me/api/portraits/women/1.jpg" }: AvatarPanelProps) => {
  return (
    <div className="space-y-6">
      <CreditDisplay credits={credits} />
      
      <div className="glass-card p-5 space-y-4">
        <h2 className="text-lg font-medium text-slate-900">Selected Avatar</h2>
        
        <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden">
          <img 
            src={avatarImage} 
            alt="Selected Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        
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
  );
};

export default AvatarPanel;
