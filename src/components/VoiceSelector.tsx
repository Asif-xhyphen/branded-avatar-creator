
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Voice {
  id: string;
  name: string;
  category: string;
  preview: string;
}

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string | null;
  onSelect: (id: string) => void;
}

const VoiceSelector = ({ voices, selectedVoice, onSelect }: VoiceSelectorProps) => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [volume, setVolume] = useState<boolean>(true);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  
  const categories = ['all', ...Array.from(new Set(voices.map(v => v.category)))];
  
  const filteredVoices = currentCategory === 'all' 
    ? voices 
    : voices.filter(v => v.category === currentCategory);
  
  const handlePlay = (id: string) => {
    if (playingVoice === id) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(id);
      // In a real implementation, we would play the audio here
      setTimeout(() => {
        setPlayingVoice(null);
      }, 3000);
    }
  };
  
  const toggleVolume = () => {
    setVolume(!volume);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-slate-900">Select a Voice</h2>
        <button 
          onClick={toggleVolume}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 focus-ring"
          aria-label={volume ? "Mute" : "Unmute"}
        >
          {volume ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      </div>
      
      <div className="flex gap-2 pb-2 overflow-x-auto hide-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap",
              "transition-colors focus-ring",
              currentCategory === category
                ? "bg-sky-100 text-sky-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
            onClick={() => setCurrentCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredVoices.map((voice) => (
          <div 
            key={voice.id}
            className={cn(
              "relative glass-card p-4 transition-all duration-200",
              selectedVoice === voice.id && "ring-2 ring-sky-500"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm text-slate-900">{voice.name}</h3>
                <span className="text-xs text-slate-500 capitalize">{voice.category}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center",
                    "bg-slate-100 text-slate-700 hover:bg-slate-200 focus-ring",
                    "transition-colors"
                  )}
                  onClick={() => handlePlay(voice.id)}
                  aria-label={playingVoice === voice.id ? "Pause voice" : "Play voice"}
                >
                  {playingVoice === voice.id ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3 translate-x-0.5" />
                  )}
                </button>
                
                <button
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center focus-ring",
                    selectedVoice === voice.id
                      ? "bg-sky-500 text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                  onClick={() => onSelect(voice.id)}
                  aria-label={selectedVoice === voice.id ? "Voice selected" : "Select voice"}
                >
                  {selectedVoice === voice.id ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-xs font-medium">+</span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Voice waveform visualization (placeholder) */}
            {playingVoice === voice.id && (
              <div className="mt-2 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-sky-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceSelector;
