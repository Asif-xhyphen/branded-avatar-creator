
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { heygenService, HeyGenAvatar } from '@/services/heygenService';

// Define a type for voices
export interface Voice {
  id: string;
  name: string;
  category: string;
  preview: string;
  voice_type?: string;
}

// Define a custom hook to encapsulate the video generation logic
export const useVideoGeneration = (initialCredits: number = 50) => {
  const [promptText, setPromptText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('script');
  const [credits, setCredits] = useState(initialCredits);
  const [selectedAvatar, setSelectedAvatar] = useState<HeyGenAvatar | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

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

  useEffect(() => {
    // Setup interval to check video status if we have a videoId
    if (videoId && isGenerating) {
      const statusCheck = setInterval(async () => {
        try {
          setCheckingStatus(true);
          const status = await heygenService.checkVideoStatus(videoId);
          
          if (status.status === 'completed' && status.url) {
            clearInterval(statusCheck);
            setIsGenerating(false);
            setVideoUrl(status.url);
            setCheckingStatus(false);
            setActiveTab('preview');
            setCredits(prev => prev - 10);
            
            toast({
              title: "Video generated!",
              description: "Your UGC video has been created successfully",
              variant: "default",
            });
          } else if (status.status === 'failed') {
            clearInterval(statusCheck);
            setIsGenerating(false);
            setCheckingStatus(false);
            
            toast({
              title: "Video generation failed",
              description: status.error || "Something went wrong",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error checking video status:", error);
        }
      }, 5000); // Check every 5 seconds
      
      return () => clearInterval(statusCheck);
    }
  }, [videoId, isGenerating]);

  const handleGenerate = async () => {
    if (!selectedVoice) {
      toast({
        title: "Voice required",
        description: "Please select a voice for your video",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAvatar) {
      toast({
        title: "Avatar required",
        description: "Please select an avatar first",
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

    // Get the voice object from the voices array
    const voice = sampleVoices.find(v => v.id === selectedVoice);
    if (!voice) {
      toast({
        title: "Invalid voice",
        description: "The selected voice is not valid",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Try to generate video using HeyGen
      const apiKey = localStorage.getItem('heygen_api_key');
      
      if (!apiKey) {
        toast({
          title: "API key required",
          description: "Please set your HeyGen API key first",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      
      heygenService.setApiKey(apiKey);
      
      const id = await heygenService.generateVideo({
        avatar_id: selectedAvatar.id,
        voice_id: voice.id,
        script: promptText,
        voice_type: voice.voice_type || "text"
      });
      
      setVideoId(id);
      
      toast({
        title: "Video generation started",
        description: "Your UGC video is being created. This may take a few minutes.",
        variant: "default",
      });
      
    } catch (error) {
      console.error("Error generating video:", error);
      setIsGenerating(false);
      
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate video",
        variant: "destructive",
      });
      
      // Fall back to the mock video generation
      simulateVideoGeneration();
    }
  };
  
  // Fallback mock generation for demo or when API fails
  const simulateVideoGeneration = () => {
    setIsGenerating(true);
    
    // Simulate video generation with a timeout
    setTimeout(() => {
      setIsGenerating(false);
      setVideoUrl('https://ddkhcvzwxehhzizvusst.supabase.co/storage/v1/object/public/keh//67324f2ce0add7ccb33ed381_UGC%20ad-transcode.mp4');
      setCredits(prev => prev - 10);
      setActiveTab('preview');
      
      toast({
        title: "Video generated! (Demo)",
        description: "This is a demo video since we couldn't connect to HeyGen",
        variant: "default",
      });
    }, 3000);
  };
  
  const handleReset = () => {
    setPromptText('');
    setSelectedVoice(null);
    setVideoUrl(null);
    setVideoId(null);
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
    selectedAvatar,
    handleGenerate,
    handleReset,
    checkingStatus
  };
};

// Mock voice data (would be fetched from HeyGen API in production)
export const sampleVoices: Voice[] = [
  { id: 'voice-1', name: 'Sarah', category: 'friendly', preview: '', voice_type: 'text' },
  { id: 'voice-2', name: 'Michael', category: 'friendly', preview: '', voice_type: 'text' },
  { id: 'voice-3', name: 'Emma', category: 'professional', preview: '', voice_type: 'text' },
  { id: 'voice-4', name: 'David', category: 'professional', preview: '', voice_type: 'text' },
  { id: 'voice-5', name: 'Jessica', category: 'enthusiastic', preview: '', voice_type: 'text' },
  { id: 'voice-6', name: 'John', category: 'enthusiastic', preview: '', voice_type: 'text' },
  { id: 'voice-7', name: 'Lisa', category: 'authoritative', preview: '', voice_type: 'text' },
  { id: 'voice-8', name: 'Robert', category: 'authoritative', preview: '', voice_type: 'text' },
];
