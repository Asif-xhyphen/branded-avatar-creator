
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { ArrowRight, ArrowUpRight, CheckCircle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const pricingPlans = [
  {
    name: 'Starter',
    price: 15,
    description: 'Perfect for testing the waters',
    credits: 10,
    features: [
      '10 AI-generated UGC videos',
      'Access to all AI avatars',
      'Standard voice selection',
      'MP4 downloads',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: 60,
    description: 'Ideal for marketing professionals',
    credits: 50,
    isPopular: true,
    features: [
      '50 AI-generated UGC videos',
      'Access to all AI avatars',
      'Premium voice selection',
      'MP4/MOV downloads',
      'Priority support',
      'Shareable links'
    ]
  },
  {
    name: 'Enterprise',
    price: 200,
    description: 'For teams and agencies',
    credits: 200,
    features: [
      '200 AI-generated UGC videos',
      'Access to all AI avatars',
      'Premium voice selection',
      'All download formats',
      'Dedicated support',
      'Shareable links',
      'Team collaboration'
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* How It Works */}
        <section className="py-20 relative overflow-hidden bg-slate-50">
          <div className="absolute inset-0 opacity-[0.02] bg-noise -z-10"></div>
          
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-medium text-sm inline-block mb-6">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Create UGC Ads in <span className="text-sky-600">Three Simple Steps</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our streamlined process makes it easy to generate authentic UGC-style videos without the hassle of traditional production.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Steps */}
                {[
                  {
                    number: 1,
                    title: 'Select an Avatar',
                    description: 'Browse our diverse collection of AI avatars and choose the one that best represents your brand.',
                    icon: PlayCircle
                  },
                  {
                    number: 2,
                    title: 'Write Your Script',
                    description: 'Craft a compelling message that highlights your product\'s unique value proposition.',
                    icon: PlayCircle
                  },
                  {
                    number: 3,
                    title: 'Generate & Share',
                    description: 'Our AI brings your script to life with a natural-looking video ready to share on any platform.',
                    icon: PlayCircle
                  }
                ].map((step, index) => (
                  <div key={index} className="relative glass-card p-6">
                    <div className="absolute -top-4 -left-4 h-8 w-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    
                    <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 mb-4">
                      <step.icon className="h-5 w-5" />
                    </div>
                    
                    <h3 className="text-xl font-medium text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                ))}
                
                {/* Connecting line (desktop only) */}
                <div className="hidden md:block absolute top-1/2 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-sky-200 -z-10" />
              </div>
              
              <div className="text-center mt-12">
                <Button size="lg" className="button-hover-effect" asChild>
                  <Link to="/avatars">
                    Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section id="pricing" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-noise -z-10"></div>
          
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-sm inline-block mb-6">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Simple, Transparent <span className="text-sky-600">Pricing</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Choose the plan that works for your needs. No hidden fees or commitments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative glass-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevation",
                    plan.isPopular && "ring-2 ring-sky-500"
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-slate-600 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="ml-2 text-slate-500">one-time</span>
                  </div>
                  
                  <div className="mb-6 p-3 bg-slate-50 rounded-lg text-center">
                    <span className="text-sm font-medium text-slate-700">
                      {plan.credits} credits ({plan.credits / 10} videos)
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0 mr-2" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      "w-full button-hover-effect",
                      !plan.isPopular && "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 max-w-2xl mx-auto">
              <div className="glass-card p-4 text-sm text-slate-600">
                Need a custom plan? <a href="#" className="text-sky-600 font-medium">Contact us</a> for enterprise pricing and features.
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="container px-6 mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="font-semibold text-xl tracking-tight">UGC Studio</span>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Create authentic, branded UGC-style videos with AI avatars and natural voices in minutes.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: [
                  { name: 'Features', href: '#' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'Avatars', href: '/avatars' },
                  { name: 'Creator', href: '/creator' }
                ]
              },
              {
                title: 'Resources',
                links: [
                  { name: 'Documentation', href: '#' },
                  { name: 'Tutorials', href: '#' },
                  { name: 'Blog', href: '#' },
                  { name: 'Support', href: '#' }
                ]
              },
              {
                title: 'Company',
                links: [
                  { name: 'About', href: '#' },
                  { name: 'Terms', href: '#' },
                  { name: 'Privacy', href: '#' },
                  { name: 'Contact', href: '#' }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-medium text-slate-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href={link.href} 
                        className="text-slate-600 hover:text-slate-900 text-sm flex items-center"
                      >
                        {link.name}
                        {link.href.startsWith('http') && (
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} UGC Studio. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social, i) => (
                <a 
                  key={i}
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
