
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProcessProps {
  className?: string;
}

const Process: React.FC<ProcessProps> = ({ className }) => {
  const steps = [
    {
      number: "01",
      title: "Smart Bin & QR Authentication",
      description: "Deposit plastic waste in our smart bins which automatically identify and sort the material type using QR codes for student authentication."
    },
    {
      number: "02",
      title: "AI Detection & Verification",
      description: "Advanced sensors and AI algorithms validate waste type to prevent fraudulent scans and analyze disposal trends."
    },
    {
      number: "03",
      title: "Processing & Shredding",
      description: "Collected plastic, especially HDPE and PET bottles, is cleaned, shredded, and prepared for the extrusion process."
    },
    {
      number: "04",
      title: "Filament Extrusion",
      description: "Shredded plastic fragments are melted and extruded into uniform 3D printing filament of various colors."
    },
    {
      number: "05",
      title: "Sustainability Scoring",
      description: "Users earn Sustainability Scores for proper waste disposal through our automated tracking system."
    },
    {
      number: "06",
      title: "Earn & Redeem",
      description: "Earn eco-points for recycling that can be converted to coins or used to purchase 3D printing filament, customized 3D objects, or discount cards."
    }
  ];

  // Implementation roadmap data
  const roadmap = [
    { 
      phase: "Phase 1", 
      title: "Research & System Design",
      timeline: "Weeks 1-4",
      activities: "Identify waste disposal locations, develop app wireframes, and design sensor integration."
    },
    { 
      phase: "Phase 2", 
      title: "Prototype Development",
      timeline: "Weeks 5-8",
      activities: "Develop mobile application, integrate QR scanning, and implement waste-detection sensors."
    },
    { 
      phase: "Phase 3", 
      title: "Pilot Testing",
      timeline: "Weeks 9-12",
      activities: "Deploy GreenSync on a small scale, gather user feedback, and refine system performance."
    },
    { 
      phase: "Phase 4", 
      title: "Full Deployment & Awareness Campaign",
      timeline: "Weeks 13-16",
      activities: "Launch system across schools and universities, conduct engagement initiatives."
    },
    { 
      phase: "Phase 5", 
      title: "Continuous Improvement & Expansion",
      timeline: "Ongoing",
      activities: "Monitor system efficiency and explore expansion opportunities."
    }
  ];

  return (
    <section id="process" className={cn("py-16", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <span className="text-greensync-primary">Process</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              From waste collection to filament creation, our closed-loop system transforms plastic waste into valuable resources.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-5xl pt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col gap-4 items-start bg-card p-6 rounded-lg shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-greensync-light flex items-center justify-center text-greensync-primary font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h3 className="text-2xl font-bold">Implementation Roadmap</h3>
            <p className="mx-auto max-w-[700px] text-gray-500">
              Our structured approach to bringing GreenSync from concept to reality.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-greensync-light"></div>
            
            {roadmap.map((item, index) => (
              <div key={index} className={`md:flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 flex justify-end md:pr-8">
                  <Card className={`w-full max-w-md shadow-md ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <span className="inline-block bg-greensync-primary/20 text-greensync-primary px-3 py-1 rounded-full text-sm font-medium">
                          {item.timeline}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.phase}: {item.title}</h4>
                      <p className="text-gray-500">{item.activities}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="hidden md:flex justify-center items-center">
                  <div className="w-6 h-6 rounded-full bg-greensync-primary border-4 border-greensync-light"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
              </div>
            ))}
          </div>
          
          {/* Mobile view for roadmap */}
          <div className="md:hidden space-y-4">
            {roadmap.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-greensync-primary/20 text-greensync-primary px-3 py-1 rounded-full text-sm font-medium">
                      {item.timeline}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.phase}: {item.title}</h4>
                  <p className="text-gray-500">{item.activities}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
