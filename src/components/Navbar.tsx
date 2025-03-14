
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronRight, LogOut, UserCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
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

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };
  
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
            {user ? (
              <>
                <div className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                  Credits: {user.credits}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-sky-100 text-sky-700">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-slate-600 hover:text-slate-900"
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="button-hover-effect"
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </>
            )}
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
                {user ? (
                  <>
                    <div className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                      Credits: {user.credits}
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-sky-100 text-sky-700 text-lg">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-36"
                      onClick={() => navigate('/sign-in')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-36 button-hover-effect"
                      onClick={() => navigate('/sign-up')}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
