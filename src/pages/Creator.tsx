
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PromptInput from '@/components/PromptInput';
import VoiceSelector from '@/components/VoiceSelector';
import CreditDisplay from '@/components/CreditDisplay';
import { ArrowLeft, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Sample voice data (would come from API in real app)
const sampleVoices = [
  { id: 'voice-1', name: 'Sarah', category: 'friendly', preview: '' },
  { id: 'voice-2', name: 'Michael', category: 'friendly', preview: '' },
  { id: 'voice-3', name: 'Emma', category: 'professional', preview: '' },
  { id: 'voice-4', name: 'David', category: 'professional', preview: '' },
  { id: 'voice-5', name: 'Jessica', category: 'enthusiastic', preview: '' },
  { id: 'voice-6', name: 'John', category: 'enthusiastic', preview: '' },
  { id: 'voice-7', name: 'Lisa', category: 'authoritative', preview: '' },
  { id: 'voice-8', name: 'Robert', category: 'authoritative', preview: '' },
];

const Creator = () => {
  const [promptText, setPromptText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('script');
  const [credits, setCredits] = useState(50);
  
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
              Craft a compelling script and select the perfect voice to bring your brand message to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="script" 
                    disabled={isGenerating}
                    className="data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Script & Voice
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    disabled={!videoUrl || isGenerating}
                    className="data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Preview & Export
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="script" className="space-y-6 animate-fade-in">
                  <div className="glass-card p-5">
                    <PromptInput
                      value={promptText}
                      onChange={setPromptText}
                      onGenerate={handleGenerate}
                      isGenerating={isGenerating}
                    />
                  </div>
                  
                  <div className="glass-card p-5">
                    <VoiceSelector
                      voices={sampleVoices}
                      selectedVoice={selectedVoice}
                      onSelect={setSelectedVoice}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6 animate-fade-in">
                  <div className="glass-card p-5 space-y-4">
                    <h2 className="text-lg font-medium text-slate-900">Your Generated Video</h2>
                    
                    <div className="bg-slate-50 rounded-lg aspect-video flex items-center justify-center border border-slate-200">
                      {videoUrl ? (
                        <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center text-white">
                          Video Preview
                        </div>
                      ) : (
                        <p className="text-slate-500">No video generated yet</p>
                      )}
                    </div>
                    
                    <div className="pt-2 flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        className="button-hover-effect"
                        disabled={!videoUrl}
                        onClick={() => {
                          toast({
                            title: "Download started",
                            description: "Your video is being downloaded",
                          });
                        }}
                      >
                        Download MP4
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="button-hover-effect"
                        disabled={!videoUrl}
                        onClick={() => {
                          toast({
                            title: "Link copied",
                            description: "Shareable link copied to clipboard",
                          });
                        }}
                      >
                        Copy Link
                      </Button>
                      
                      <Button
                        className="button-hover-effect ml-auto"
                        onClick={handleReset}
                      >
                        Create Another
                      </Button>
                    </div>
                  </div>
                  
                  <div className="glass-card p-5 space-y-4">
                    <h2 className="text-lg font-medium text-slate-900">Generation Details</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">Script</h3>
                          <p className="text-sm text-slate-600 mt-1">{promptText}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('script')}>
                          Edit
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">Voice</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {selectedVoice 
                              ? sampleVoices.find(v => v.id === selectedVoice)?.name || 'Selected voice'
                              : 'No voice selected'}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('script')}>
                          Change
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">Credits Used</h3>
                          <p className="text-sm text-slate-600 mt-1">10 credits</p>
                        </div>
                        <div className="flex items-center text-emerald-600 text-sm font-medium">
                          <CheckCircle className="mr-1.5 h-4 w-4" />
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <CreditDisplay credits={credits} />
              
              <div className="glass-card p-5 space-y-4">
                <h2 className="text-lg font-medium text-slate-900">Selected Avatar</h2>
                
                <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/1.jpg" 
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
