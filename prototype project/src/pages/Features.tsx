
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Award, Recycle, Database } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-greensync-primary" />,
      title: "Smart Bins with Sensors",
      description: "Our intelligent waste bins use advanced sensors and AI algorithms to automatically identify and sort different types of waste materials with high accuracy. Each bin contains ultrasonic sensors, weight measurement systems, and image recognition cameras to ensure proper waste classification."
    },
    {
      icon: <Award className="h-12 w-12 text-greensync-primary" />,
      title: "Eco-points & Leaderboards",
      description: "Every time you properly dispose of waste, you earn Eco-points that accumulate in your personal account. Our live leaderboards showcase top contributors, creating a friendly competition that encourages consistent participation in sustainable practices across campus."
    },
    {
      icon: <Award className="h-12 w-12 text-greensync-primary" />,
      title: "Eco Steward Certifications",
      description: "Consistently participate in our recycling initiatives to earn prestigious Eco Steward certifications that can be added to your resume and LinkedIn profile. These digital badges verify your commitment to sustainability and environmental stewardship."
    },
    {
      icon: <Recycle className="h-12 w-12 text-greensync-primary" />,
      title: "3D Filament from Recycled Plastic",
      description: "We've developed an innovative process to convert collected plastic waste into high-quality 3D printing filament. This closed-loop system transforms waste into valuable resources that students and faculty can use for academic and creative projects."
    }
  ];

  const additionalFeatures = [
    {
      title: "QR Authentication",
      description: "Secure user verification through personalized QR codes ensures accurate tracking of individual contributions while preventing fraudulent scans."
    },
    {
      title: "Mobile App Integration",
      description: "Track your impact, monitor your Eco-points, and participate in challenges through our user-friendly mobile application available on iOS and Android."
    },
    {
      title: "Analytics Dashboard",
      description: "Access detailed insights on your recycling habits, impact metrics, and historical contribution data through our comprehensive analytics platform."
    },
    {
      title: "Community Challenges",
      description: "Participate in time-limited eco-challenges that promote specific sustainability goals and offer enhanced rewards for participation."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                GreenSync <span className="text-greensync-primary">Features</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Our comprehensive waste management solution combines smart technology with community engagement to create a sustainable future.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-md overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-greensync-primary/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">
                More Innovative <span className="text-greensync-primary">Features</span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {additionalFeatures.map((feature, index) => (
                  <Card key={index} className="border-none shadow-sm h-full">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Card className="border-none shadow-md bg-greensync-primary text-white overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Ready to join the green movement?</h2>
                  <p className="mb-6">
                    Help us create a more sustainable campus and earn rewards while making a positive environmental impact.
                  </p>
                  <button className="bg-white text-greensync-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                    Get Started Today
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
