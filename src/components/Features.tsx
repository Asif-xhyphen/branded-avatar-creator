
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, BarChart3, Clock, Cpu, Film, Search, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div 
      ref={ref}
      className={cn(
        'relative glass-card p-6 transition-all duration-700 ease-out',
        'transform opacity-0 translate-y-8',
        inView && 'opacity-100 translate-y-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-1.5">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'AI Avatar Selection',
      description: 'Choose from 50+ diverse, professional AI avatars that match your brand voice and identity.'
    },
    {
      icon: Film,
      title: 'One-Click Generation',
      description: 'Transform your text into professional UGC-style videos with a single click.'
    },
    {
      icon: Sparkles,
      title: 'Natural Voice Synthesis',
      description: 'Select from 20+ lifelike voices that convey authentic emotion and proper emphasis.'
    },
    {
      icon: Clock, 
      title: 'Fast Turnaround',
      description: 'Get your videos in minutes, not days. Perfect for time-sensitive campaigns.'
    },
    {
      icon: Search, 
      title: 'Brand Alignment',
      description: 'Ensure all content maintains consistent messaging and visual identity.'
    },
    {
      icon: BarChart3, 
      title: 'Scale Your Content',
      description: 'Create multiple variations for A/B testing or different platforms simultaneously.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-noise -z-10"></div>
      
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-sm inline-block mb-6">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Everything You Need to Create <span className="text-sky-600">Compelling UGC</span>
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with an intuitive interface, giving you all the tools to create authentic, effective marketing content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
