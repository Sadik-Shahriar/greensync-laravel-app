
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Trash2, Trophy, Gift, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <QrCode className="h-8 w-8 text-greensync-primary" />,
      title: "Scan QR Code",
      description: "Use your smartphone to scan the QR code on any GreenSync smart bin across campus.",
      detail: "Each smart bin is equipped with a unique QR code that identifies the location and waste type."
    },
    {
      icon: <Trash2 className="h-8 w-8 text-greensync-primary" />,
      title: "Dispose Correctly",
      description: "Sort and dispose your waste in the appropriate compartment based on material type.",
      detail: "Our smart sensors verify proper disposal and categorize waste automatically."
    },
    {
      icon: <Trophy className="h-8 w-8 text-greensync-primary" />,
      title: "Earn Eco-Points",
      description: "Receive instant eco-points for verified waste disposal with real-time feedback.",
      detail: "Points vary based on waste type and proper sorting accuracy."
    },
    {
      icon: <Gift className="h-8 w-8 text-greensync-primary" />,
      title: "Redeem Rewards",
      description: "Exchange your eco-points for rewards, badges, and exclusive campus benefits.",
      detail: "Unlock certificates, discounts, and special recognition as an Eco Steward."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How GreenSync Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of waste management with our simple 4-step process that 
            turns everyday actions into environmental impact.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-greensync-light p-4 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <div className="mb-2 text-lg font-semibold text-greensync-primary">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="text-sm text-gray-500">{step.detail}</div>
                </CardContent>
              </Card>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-greensync-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Gamification Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Gamified Sustainability</h3>
            <p className="text-gray-600">
              Level up your environmental impact with our engaging reward system
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-greensync-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-greensync-primary" />
              </div>
              <h4 className="font-semibold mb-2">Leaderboards</h4>
              <p className="text-sm text-gray-600">Compete with peers and climb the sustainability rankings</p>
            </div>
            
            <div className="text-center">
              <div className="bg-greensync-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="h-8 w-8 text-greensync-primary" />
              </div>
              <h4 className="font-semibold mb-2">Achievements</h4>
              <p className="text-sm text-gray-600">Unlock badges and certifications for your eco-achievements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-greensync-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <QrCode className="h-8 w-8 text-greensync-primary" />
              </div>
              <h4 className="font-semibold mb-2">Smart Integration</h4>
              <p className="text-sm text-gray-600">Seamless QR code and NFC technology for instant tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
