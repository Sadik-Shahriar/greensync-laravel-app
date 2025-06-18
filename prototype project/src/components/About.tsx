
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Star, Recycle, Users, Database } from 'lucide-react';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-greensync-primary" />,
      title: "User Engagement & Rewards",
      description: "Earn points for recycling waste correctly and participate in eco-challenges that benefit both you and the environment."
    },
    {
      icon: <Recycle className="h-10 w-10 text-greensync-primary" />,
      title: "Waste to Filament Conversion",
      description: "Transform plastic waste into high-quality 3D printing filament through our innovative recycling process."
    },
    {
      icon: <Star className="h-10 w-10 text-greensync-primary" />,
      title: "Smart Detection Technology",
      description: "Our bins use AI to verify waste types and ensure proper recycling, optimizing the filament production process."
    },
    {
      icon: <Database className="h-10 w-10 text-greensync-primary" />,
      title: "Data-Driven Decision Making",
      description: "Web-based dashboard provides real-time insights to optimize waste management strategies."
    }
  ];

  const sdgs = [
    {
      number: "11",
      title: "Sustainable Cities and Communities",
      description: "Promoting responsible waste management in educational institutions and beyond."
    },
    {
      number: "12",
      title: "Responsible Consumption and Production",
      description: "Encouraging mindful waste disposal habits through technology and incentives."
    },
    {
      number: "13",
      title: "Climate Action",
      description: "Reducing pollution and fostering environmental awareness through proper waste management."
    }
  ];

  return (
    <section id="about" className={cn("py-16 bg-muted", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About <span className="text-greensync-primary">GreenSync</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Waste mismanagement is a significant issue in universities and schools, where students frequently dispose of waste improperly. GreenSync revolutionizes plastic waste management by converting waste into valuable 3D printing materials while rewarding eco-conscious behavior.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 pt-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-none shadow-md">
              <CardHeader className="flex flex-col items-center pb-2">
                {feature.icon}
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-500 dark:text-gray-400">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h3 className="text-2xl font-bold">Alignment with UN Sustainable Development Goals</h3>
            <p className="mx-auto max-w-[700px] text-gray-500">
              GreenSync directly contributes to the following UN Sustainable Development Goals:
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {sdgs.map((sdg, index) => (
              <div key={index} className="flex flex-col items-center p-4 border border-border rounded-lg bg-card">
                <div className="w-12 h-12 rounded-full bg-greensync-primary text-white flex items-center justify-center text-xl font-bold mb-3">
                  {sdg.number}
                </div>
                <h4 className="font-bold text-lg mb-2">{sdg.title}</h4>
                <p className="text-center text-sm text-gray-500">{sdg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
