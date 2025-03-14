
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CreditDisplayProps {
  horizontal?: boolean;
  credits?: number; // Add this optional prop
}

const CreditDisplay = ({ horizontal = false, credits: propCredits }: CreditDisplayProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Use propCredits if provided, otherwise use user.credits
  const credits = propCredits !== undefined ? propCredits : (user?.credits || 0);

  const handleGetMoreCredits = () => {
    // This would redirect to a payment page in a real application
    navigate('/purchase-credits');
  };

  return (
    <div className={cn(
      "glass-card overflow-hidden",
      horizontal ? "flex items-center" : ""
    )}>
      <div className={cn(
        "p-4 bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-900/10 dark:to-slate-900/20 border-b border-slate-100 dark:border-slate-800",
        horizontal && "border-b-0 border-r flex-shrink-0"
      )}>
        <div className="flex items-center space-x-3">
          <div className="bg-white dark:bg-slate-800 h-10 w-10 rounded-full flex items-center justify-center shadow-subtle">
            <CreditCard className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-slate-100">Your Credits</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Generate videos</p>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "p-4",
        horizontal && "flex-grow flex items-center justify-between"
      )}>
        <div className="mb-3">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-slate-900">{credits}</span>
            <span className="ml-1 text-sm text-slate-500">credits remaining</span>
          </div>
          <p className="text-xs text-slate-600">Each video costs 10 credits to generate</p>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full button-hover-effect"
          onClick={handleGetMoreCredits}
        >
          Get More Credits
        </Button>
      </div>
    </div>
  );
};

export default CreditDisplay;
