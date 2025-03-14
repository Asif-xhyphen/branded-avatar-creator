
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define a custom hook to encapsulate the video generation logic
export const useVideoGeneration = (initialCredits: number = 50) => {
  const [promptText, setPromptText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('script');
  const [credits, setCredits] = useState(initialCredits);

  const handleGenerate = () => {
    if (!selectedVoice) {
      toast({
        title: "Voice required",
        description: "Please select a voice for your video",
        variant: "destructive",
      });
      return;
    }
    
    if (credits < 10) {
      toast({
        title: "Insufficient credits",
        description: "You need at least 10 credits to generate a video",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setVideoUrl('https://example.com/video.mp4');
      setCredits(prev => prev - 10);
      setActiveTab('preview');
      
      toast({
        title: "Video generated!",
        description: "Your UGC video has been created successfully",
        variant: "default",
      });
    }, 3000);
  };
  
  const handleReset = () => {
    setPromptText('');
    setSelectedVoice(null);
    setVideoUrl(null);
    setActiveTab('script');
  };

  return {
    promptText,
    setPromptText,
    selectedVoice,
    setSelectedVoice,
    isGenerating,
    setIsGenerating,
    videoUrl,
    setVideoUrl,
    activeTab,
    setActiveTab,
    credits,
    setCredits,
    handleGenerate,
    handleReset
  };
};

// Mock voice data
export const sampleVoices = [
  { id: 'voice-1', name: 'Sarah', category: 'friendly', preview: '' },
  { id: 'voice-2', name: 'Michael', category: 'friendly', preview: '' },
  { id: 'voice-3', name: 'Emma', category: 'professional', preview: '' },
  { id: 'voice-4', name: 'David', category: 'professional', preview: '' },
  { id: 'voice-5', name: 'Jessica', category: 'enthusiastic', preview: '' },
  { id: 'voice-6', name: 'John', category: 'enthusiastic', preview: '' },
  { id: 'voice-7', name: 'Lisa', category: 'authoritative', preview: '' },
  { id: 'voice-8', name: 'Robert', category: 'authoritative', preview: '' },
];
