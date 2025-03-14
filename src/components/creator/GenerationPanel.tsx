
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PromptInput from '@/components/PromptInput';
import VoiceSelector from '@/components/VoiceSelector';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface GenerationPanelProps {
  promptText: string;
  setPromptText: (text: string) => void;
  selectedVoice: string | null;
  setSelectedVoice: (voice: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  voices: Array<{
    id: string;
    name: string;
    category: string;
    preview: string;
  }>;
}

const GenerationPanel = ({ 
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
  onGenerate,
  onReset,
  voices
}: GenerationPanelProps) => {
  return (
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
            onGenerate={onGenerate}
            isGenerating={isGenerating}
          />
        </div>
        
        <div className="glass-card p-5">
          <VoiceSelector
            voices={voices}
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
              onClick={onReset}
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
                    ? voices.find(v => v.id === selectedVoice)?.name || 'Selected voice'
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
  );
};

export default GenerationPanel;
