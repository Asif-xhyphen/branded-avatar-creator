
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GenerationPanel from '@/components/creator/GenerationPanel';
import AvatarPanel from '@/components/creator/AvatarPanel';
import { useVideoGeneration, sampleVoices } from '@/components/creator/VideoGenerationLogic';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Creator = () => {
  const {
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
    handleGenerate,
    handleReset,
    checkingStatus,
    selectedAvatar
  } = useVideoGeneration();
  
  useEffect(() => {
    // Check if we have a selected avatar
    if (!selectedAvatar) {
      toast.warning("Please select an avatar first", {
        action: {
          label: "Select Avatar",
          onClick: () => window.location.href = '/avatars'
        }
      });
    }
  }, [selectedAvatar]);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/avatars" 
              className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4 focus-ring rounded-md px-2 py-1 -ml-2"
            >
              <ArrowLeft className="mr-1 h-3.5 w-3.5" />
              Back to Avatars
            </Link>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Create Your UGC Video</h1>
            <p className="text-slate-600 max-w-2xl">
              Craft a compelling script and select the perfect voice to bring your brand message to life using HeyGen AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GenerationPanel
                promptText={promptText}
                setPromptText={setPromptText}
                selectedVoice={selectedVoice}
                setSelectedVoice={setSelectedVoice}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onGenerate={handleGenerate}
                onReset={handleReset}
                voices={sampleVoices}
                checkingStatus={checkingStatus}
              />
            </div>
            
            <div>
              <AvatarPanel credits={credits} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
