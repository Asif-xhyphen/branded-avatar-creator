
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:py-32 lg:pb-40 min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-gradient opacity-60 -z-10"></div>
      <div className="absolute inset-0 opacity-[0.02] bg-noise -z-10"></div>
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      
      <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="col-span-1 space-y-8 max-w-2xl">
          <div 
            className={cn(
              'transition-all duration-1000 ease-out opacity-0 translate-y-8',
              isVisible && 'opacity-100 translate-y-0'
            )}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-6">
              Create Branded UGC Ads Instantly
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className="block">Transform Your Marketing</span>
              <span className="block text-sky-600">with AI-Powered Video Content</span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              Create authentic, branded UGC-style videos with AI avatars and natural voices in minutes. No filming, no editing, just results.
            </p>
          </div>
          
          <div 
            className={cn(
              'pt-2 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex items-center transition-all duration-1000 delay-300 ease-out opacity-0 translate-y-8',
              isVisible && 'opacity-100 translate-y-0'
            )}
          >
            <Button size="lg" className="w-full sm:w-auto button-hover-effect">
              Start Creating <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <button className="flex items-center justify-center w-full sm:w-auto space-x-2 px-6 py-2.5 text-slate-700 font-medium hover:text-slate-900 focus-ring rounded-lg transition-colors">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <Play className="h-3 w-3 fill-current text-sky-600" />
              </span>
              <span>See How It Works</span>
            </button>
          </div>
          
          <div 
            className={cn(
              'pt-8 transition-all duration-1000 delay-500 ease-out opacity-0 translate-y-8',
              isVisible && 'opacity-100 translate-y-0'
            )}
          >
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">1,000+ marketers</span> trust UGC Studio
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={cn(
            'col-span-1 relative transition-all duration-1000 delay-700 ease-out opacity-0 translate-y-8',
            isVisible && 'opacity-100 translate-y-0'
          )}
        >
          <div className="relative bg-white shadow-elevation rounded-xl overflow-hidden aspect-video">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <p className="text-slate-500 font-medium">Video preview</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>
          </div>
          
          {/* Designer elements */}
          <div className="absolute -right-12 -bottom-10 w-40 h-40 rounded-full bg-slate-50 blur-xl opacity-70"></div>
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 h-64 w-20 bg-gradient-to-r from-sky-50 to-transparent rounded-full blur-xl opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
