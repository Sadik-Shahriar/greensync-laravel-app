
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Menu, X, UserPlus, LogIn, Home, Award, Info, Phone, LogOut, User, BarChart2, Settings, Users, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'How It Works', href: '/#how-it-works', icon: <Info className="h-4 w-4 mr-2" /> },
    { name: 'Impact', href: '/#impact', icon: <Target className="h-4 w-4 mr-2" /> },
    { name: 'Leaderboard', href: '/#leaderboard', icon: <Award className="h-4 w-4 mr-2" /> },
    { name: 'Partners', href: '/#partners', icon: <Users className="h-4 w-4 mr-2" /> },
    { name: 'FAQ', href: '/#faq', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  // Add dashboard link if user is logged in
  if (user) {
    navLinks.push({ 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <BarChart2 className="h-4 w-4 mr-2" /> 
    });
  }

  // Check if user is admin (for demo purposes, checking if email includes "admin")
  const isAdmin = user && user.email && user.user_metadata?.role === 'admin';
  
  if (isAdmin) {
    navLinks.push({ 
      name: 'Admin', 
      href: '/admin', 
      icon: <Settings className="h-4 w-4 mr-2" /> 
    });
  }

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur", className)}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <button 
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors hover:text-greensync-primary"
              >
                {link.name}
              </button>
            ) : (
              <Link 
                key={link.name}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-greensync-primary"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          {/* Combined Auth Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {user ? (
                  <NavigationMenuTrigger className="bg-greensync-primary hover:bg-greensync-secondary text-white">
                    <User className="h-4 w-4 mr-1" />
                    Account
                  </NavigationMenuTrigger>
                ) : (
                  <NavigationMenuTrigger className="bg-greensync-primary hover:bg-greensync-secondary text-white">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Account
                  </NavigationMenuTrigger>
                )}
                <NavigationMenuContent>
                  <div className="p-2 w-48">
                    {user ? (
                      <>
                        <div className="p-2 border-b border-gray-200 mb-2">
                          <p className="text-sm font-medium">{user.email}</p>
                        </div>
                        <Link 
                          to="/dashboard" 
                          className="flex w-full items-center gap-2 p-2 hover:bg-accent rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <BarChart2 className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        {isAdmin && (
                          <Link 
                            to="/admin" 
                            className="flex w-full items-center gap-2 p-2 hover:bg-accent rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <button 
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2 p-2 hover:bg-accent rounded-md"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                        >
                          <LogIn className="h-4 w-4" />
                          <span>Log in</span>
                        </Link>
                        <Link 
                          to="/signup" 
                          className="flex items-center gap-2 p-2 hover:bg-accent rounded-md text-greensync-primary"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Sign up</span>
                        </Link>
                      </>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation with icons */}
      {isOpen && (
        <nav className="md:hidden p-4 border-t bg-background animate-fade-in">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith("/#") ? (
                  <button 
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center py-2 text-sm font-medium transition-colors hover:text-greensync-primary w-full text-left"
                  >
                    {link.icon}
                    {link.name}
                  </button>
                ) : (
                  <Link 
                    to={link.href}
                    className="flex items-center py-2 text-sm font-medium transition-colors hover:text-greensync-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
