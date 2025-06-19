
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-10 h-10">
        <img 
          src="/lovable-uploads/e6830b5f-7392-40a2-8460-cba8523123fd.png" 
          alt="GreenSync Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="font-bold text-xl tracking-tight">
        <span className="text-black">GREEN</span>
        <span className="text-greensync-primary">SYNC</span>
      </div>
    </div>
  );
};

export default Logo;
