
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Avatars', path: '/avatars' },
    { name: 'Create', path: '/creator' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 z-10"
          aria-label="UGC Studio"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">UGC Studio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-md transition-colors text-sm font-medium focus-ring',
                    location.pathname === link.path 
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="ml-6 flex items-center space-x-3">
            <div className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
              Credits: 10
            </div>
            <Button size="sm" className="button-hover-effect">
              Sign In <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden z-10 rounded-md p-2 text-slate-600 hover:bg-slate-100 focus-ring"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        
        {/* Mobile menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-0 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden',
            isMobileMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible'
          )}
        >
          <ul className="flex flex-col items-center space-y-6 text-lg">
            {links.map((link) => (
              <li key={link.path} className="w-full text-center">
                <Link
                  to={link.path}
                  className={cn(
                    'block py-2 px-6 rounded-md transition-colors',
                    location.pathname === link.path 
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-6 w-full">
              <div className="flex flex-col items-center space-y-3">
                <div className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                  Credits: 10
                </div>
                <Button className="w-36 button-hover-effect">
                  Sign In
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
