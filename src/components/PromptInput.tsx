
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, AlertCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

const PromptInput = ({ 
  value, 
  onChange, 
  onGenerate, 
  isGenerating,
  disabled = false 
}: PromptInputProps) => {
  const [showExamples, setShowExamples] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const maxLength = 500;
  
  const examples = [
    "I love how [Brand] made my morning routine so much easier. Their coffee machine is intuitive and brews the perfect cup every time.",
    "As someone who's tried countless skincare products, [Brand]'s serum stands out for its gentle yet effective formula.",
    "If you're looking for comfortable workout clothes that actually last, [Brand] has been my go-to for the past year."
  ];
  
  const handleExampleClick = (example: string) => {
    onChange(example);
    setShowExamples(false);
  };
  
  const charCount = value.length;
  const isValid = value.length > 0 && value.includes('[Brand]');
  
  return (
    <div className="space-y-3">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-slate-900">Script Your Message</h2>
          <div className="text-xs text-slate-500 font-medium">
            {charCount}/{maxLength} characters
          </div>
        </div>
        
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your message here... Use [Brand] to include your brand name."
            className="min-h-[120px] resize-y focus-visible:ring-sky-500"
            maxLength={maxLength}
            disabled={disabled || isGenerating}
          />
          
          {!isValid && value.length > 0 && !value.includes('[Brand]') && (
            <div className="mt-2 flex items-start gap-2 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                Remember to include [Brand] in your message where you want your brand name to appear.
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-between items-center mt-3 gap-y-4">
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setShowExamples(!showExamples)}
            >
              Examples <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", showExamples && "rotate-180")} />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setShowTips(!showTips)}
            >
              Tips <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", showTips && "rotate-180")} />
            </Button>
          </div>
          
          <Button
            onClick={onGenerate}
            disabled={!isValid || disabled || isGenerating}
            className="button-hover-effect"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                Generate Video <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        {/* Examples dropdown */}
        {showExamples && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 shadow-subtle space-y-3 animate-fade-in-up">
            <h3 className="text-sm font-medium text-slate-900">Example Scripts</h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  className="block w-full text-left p-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Tips dropdown */}
        {showTips && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 shadow-subtle space-y-3 animate-fade-in-up">
            <h3 className="text-sm font-medium text-slate-900">Tips for Great Results</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Use conversational language that sounds natural when spoken</li>
              <li>Include [Brand] where you want your brand name to appear</li>
              <li>Keep messages under 400 characters for best results</li>
              <li>Focus on one key benefit or feature per video</li>
              <li>Use emotion and personal experiences for authenticity</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptInput;
