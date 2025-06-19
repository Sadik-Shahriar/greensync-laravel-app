
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Recycle, Award, Users, Target, Leaf } from 'lucide-react';

const Impact = () => {
  const [animatedValues, setAnimatedValues] = useState({
    ecoPoints: 0,
    wasteProcessed: 0,
    activeUsers: 0,
    institutions: 0
  });

  // Animate counters on component mount
  useEffect(() => {
    const targets = {
      ecoPoints: 89247,
      wasteProcessed: 2847,
      activeUsers: 1247,
      institutions: 12
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedValues({
        ecoPoints: Math.floor(targets.ecoPoints * progress),
        wasteProcessed: Math.floor(targets.wasteProcessed * progress),
        activeUsers: Math.floor(targets.activeUsers * progress),
        institutions: Math.floor(targets.institutions * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const sdgGoals = [
    {
      number: 11,
      title: "Sustainable Cities",
      description: "Creating sustainable and resilient campus communities"
    },
    {
      number: 12,
      title: "Responsible Consumption",
      description: "Promoting sustainable consumption and production patterns"
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Taking urgent action to combat climate change"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Environmental Science Professor",
      institution: "University of California",
      quote: "GreenSync has transformed how our students engage with sustainability. The gamification makes environmental responsibility exciting and measurable."
    },
    {
      name: "Michael Chen",
      role: "Student Council President",
      institution: "Stanford University",
      quote: "Since implementing GreenSync, our campus waste reduction has increased by 40%. Students love competing on the leaderboards!"
    }
  ];

  return (
    <section id="impact" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Environmental Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measuring success through tangible environmental outcomes and community engagement
          </p>
        </div>

        {/* Dynamic Impact Counters */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Award className="h-8 w-8 text-greensync-primary mx-auto" />
              </div>
              <div className="text-3xl font-bold text-greensync-primary mb-2">
                {animatedValues.ecoPoints.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Total Eco-Points Awarded</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Recycle className="h-8 w-8 text-greensync-primary mx-auto" />
              </div>
              <div className="text-3xl font-bold text-greensync-primary mb-2">
                {animatedValues.wasteProcessed.toLocaleString()}kg
              </div>
              <div className="text-sm text-gray-600">Waste Properly Processed</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Users className="h-8 w-8 text-greensync-primary mx-auto" />
              </div>
              <div className="text-3xl font-bold text-greensync-primary mb-2">
                {animatedValues.activeUsers.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Globe className="h-8 w-8 text-greensync-primary mx-auto" />
              </div>
              <div className="text-3xl font-bold text-greensync-primary mb-2">
                {animatedValues.institutions}+
              </div>
              <div className="text-sm text-gray-600">Partner Institutions</div>
            </CardContent>
          </Card>
        </div>

        {/* UN SDG Alignment */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Aligned with UN Sustainable Development Goals</h3>
            <p className="text-gray-600">Contributing to global sustainability targets through local action</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {sdgGoals.map((goal) => (
              <Card key={goal.number} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-greensync-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {goal.number}
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-greensync-light/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
            <p className="text-gray-600">Hear from institutions making a difference with GreenSync</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-4xl text-greensync-primary mb-2">"</div>
                    <p className="text-gray-700 italic">{testimonial.quote}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-greensync-primary">{testimonial.institution}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-greensync-primary text-white rounded-2xl p-8">
            <Leaf className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
            <p className="text-greensync-light mb-6">
              Join thousands of students and institutions creating a sustainable future
            </p>
            <button 
              onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-greensync-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
