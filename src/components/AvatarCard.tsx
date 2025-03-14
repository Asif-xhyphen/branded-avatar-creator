
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Play, Pause, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarCardProps {
  id: string;
  name: string;
  image: string;
  tags: string[];
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

const AvatarCard = ({ 
  id, 
  name, 
  image, 
  tags, 
  isSelected = false,
  onSelect 
}: AvatarCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isPlaying) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };
  
  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };
  
  const handleSelect = () => {
    onSelect(id);
  };
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-300",
        "transform hover:-translate-y-1 hover:shadow-elevation",
        "bg-white dark:bg-slate-900",
        isSelected && "ring-2 ring-sky-500"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {/* Static image */}
        <img 
          src={image} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            (isHovering || isPlaying) ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
        />
        
        {/* Video preview (placeholder) */}
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            (isHovering || isPlaying) ? "opacity-100" : "opacity-0"
          )}
          src="https://ddkhcvzwxehhzizvusst.supabase.co/storage/v1/object/public/keh//67324f2ce0add7ccb33ed381_UGC%20ad-transcode.mp4"
          loop
          muted
          playsInline
        />
        
        {/* Overlay content */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent dark:from-black/90",
            "flex flex-col justify-between p-4 transition-opacity duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Top controls */}
          <div className="flex justify-between">
            <div>
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block text-[10px] font-medium bg-sky-100/90 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 rounded-full px-2 py-0.5 mr-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Update play button styles */}
            <button
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                "bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200",
                "hover:bg-white dark:hover:bg-slate-700 focus-ring",
                "transition-transform duration-300 ease-out"
              )}
              onClick={handlePlayToggle}
              aria-label={isPlaying ? "Pause preview" : "Play preview"}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-0.5" />
              )}
            </button>
          </div>
          
          {/* Bottom content */}
          <div className="space-y-2">
            <Button 
              size="sm" 
              className="w-full button-hover-effect"
              onClick={handleSelect}
            >
              {isSelected ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5" /> Selected
                </>
              ) : (
                <>
                  Use This Avatar <ChevronRight className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Avatar name */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-medium text-sm text-slate-900 dark:text-slate-200">{name}</h3>
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 h-6 w-6 bg-sky-500 rounded-full flex items-center justify-center z-10">
          <Check className="h-3.5 w-3.5 text-white" />
        </div>
      )}
    </div>
  );
};

export default AvatarCard;
