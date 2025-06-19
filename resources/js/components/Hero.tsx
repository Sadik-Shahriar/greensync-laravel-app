
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Award, BarChart2, Leaf, Recycle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const { user } = useAuth();
  
  return (
    <section className={cn("py-12 md:py-24 lg:py-32 bg-gradient-to-br from-greensync-light to-white", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block bg-greensync-primary/10 text-greensync-primary px-4 py-2 rounded-full text-sm font-medium">
                🌱 Smart Waste Management Revolution
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Campus
                <span className="text-greensync-primary block"> Sustainability</span>
              </h1>
              <p className="text-gray-600 md:text-xl max-w-[600px] leading-relaxed">
                Join the GreenSync revolution! Use QR codes and NFC cards at smart bins to track your eco-impact, 
                earn rewards, and help create a sustainable campus environment.
              </p>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-greensync-primary">1,247</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-greensync-primary">89.2K</div>
                <div className="text-sm text-gray-600">Eco Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-greensync-primary">342kg</div>
                <div className="text-sm text-gray-600">Waste Saved</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row">
              {user ? (
                <Button className="bg-greensync-primary hover:bg-greensync-secondary text-white" size="lg" asChild>
                  <Link to="/dashboard">
                    <BarChart2 className="mr-2 h-5 w-5" /> 
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <Button className="bg-greensync-primary hover:bg-greensync-secondary text-white" size="lg" asChild>
                  <Link to="/signup">
                    <Leaf className="mr-2 h-5 w-5" />
                    Join GreenSync
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                <Recycle className="mr-2 h-5 w-5" /> 
                How It Works
              </Button>
            </div>
            
            {/* Features Preview */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-greensync-primary rounded-full"></div>
                QR Code Scanning
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-greensync-primary rounded-full"></div>
                Real-time Rewards
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-greensync-primary rounded-full"></div>
                Impact Tracking
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              <img 
                alt="GreenSync Smart Waste Management System" 
                className="object-contain w-full h-full animate-fade-in" 
                src="/lovable-uploads/e6830b5f-7392-40a2-8460-cba8523123fd.png" 
              />
              {/* Floating elements for visual appeal */}
              <div className="absolute top-10 right-10 bg-white shadow-lg rounded-full p-3 animate-pulse">
                <Award className="h-6 w-6 text-greensync-primary" />
              </div>
              <div className="absolute bottom-20 left-10 bg-white shadow-lg rounded-full p-3 animate-pulse" style={{ animationDelay: '1s' }}>
                <Users className="h-6 w-6 text-greensync-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
