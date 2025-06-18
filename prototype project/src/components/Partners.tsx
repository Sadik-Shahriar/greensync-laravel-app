import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Users, Handshake, Mail, Phone, Globe } from 'lucide-react';
const Partners = () => {
  const currentPartners = [{
    name: "BRAC University",
    type: "Educational Institution",
    contribution: "Pilot program with 500+ active users",
    logo: "🎓",
    impact: "2,450 kg waste processed"
  }, {
    name: "TechShop BD",
    type: "Technology Partner",
    contribution: "Smart bin sensors and IoT infrastructure",
    logo: "🔧",
    impact: "15 smart bins installed"
  }, {
    name: "Origin Of Hopes",
    type: "Environmental Partner",
    contribution: "Educational content and sustainability workshops",
    logo: "🌱",
    impact: "12 workshops conducted"
  }, {
    name: "Printora",
    type: "Industry Partner",
    contribution: "PETG filament recycling and processing",
    logo: "♻️",
    impact: "85% plastic recycling rate"
  }];
  const partnershipBenefits = [{
    icon: <Users className="h-6 w-6 text-greensync-primary" />,
    title: "Community Impact",
    description: "Engage your community in meaningful sustainability initiatives"
  }, {
    icon: <Globe className="h-6 w-6 text-greensync-primary" />,
    title: "Brand Visibility",
    description: "Showcase your commitment to environmental responsibility"
  }, {
    icon: <Building className="h-6 w-6 text-greensync-primary" />,
    title: "Custom Integration",
    description: "Tailored solutions that fit your institution's needs"
  }];
  return <section id="partners" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Partners & Collaborators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a sustainable future together with leading institutions, 
            NGOs, and innovative companies
          </p>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Current Partners</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {currentPartners.map((partner, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <CardTitle className="text-xl font-bold">{partner.name}</CardTitle>
                  <div className="text-sm text-greensync-primary font-medium">
                    {partner.type}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-3">{partner.contribution}</p>
                  <div className="bg-greensync-light/50 px-3 py-2 rounded-full">
                    <span className="text-xs font-medium text-greensync-primary">
                      {partner.impact}
                    </span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Partner with GreenSync?</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {partnershipBenefits.map((benefit, index) => <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-greensync-light p-3 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-16 bg-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Partnership Opportunities</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 border rounded-lg">
              <Building className="h-12 w-12 text-greensync-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Educational Institutions</h4>
              <p className="text-sm text-gray-600 mb-4">
                Universities, colleges, and schools looking to implement sustainable practices
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Custom deployment strategies</li>
                <li>• Student engagement programs</li>
                <li>• Academic research collaboration</li>
              </ul>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <Handshake className="h-12 w-12 text-greensync-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">NGOs & Nonprofits</h4>
              <p className="text-sm text-gray-600 mb-4">
                Environmental organizations focused on sustainability and education
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Content collaboration</li>
                <li>• Community outreach</li>
                <li>• Impact measurement</li>
              </ul>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <Globe className="h-12 w-12 text-greensync-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Corporate Partners</h4>
              <p className="text-sm text-gray-600 mb-4">
                Companies committed to environmental responsibility and innovation
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Technology integration</li>
                <li>• Sustainability reporting</li>
                <li>• Employee engagement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partnership Inquiry Form */}
        <div className="bg-greensync-primary text-white rounded-2xl p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="text-greensync-light">
                Join our mission to create sustainable communities. Get in touch to explore partnership opportunities.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="organization" className="text-white">Organization Name</Label>
                  <Input id="organization" placeholder="Your organization" className="bg-white/10 border-white/20 text-white placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="contact-name" className="text-white">Contact Person</Label>
                  <Input id="contact-name" placeholder="Your name" className="bg-white/10 border-white/20 text-white placeholder:text-white/70" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input id="email" type="email" placeholder="contact@organization.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="partnership-type" className="text-white">Partnership Interest</Label>
                  <select id="partnership-type" className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white">
                    <option value="">Select type</option>
                    <option value="educational">Educational Institution</option>
                    <option value="ngo">NGO/Nonprofit</option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="technology">Technology Provider</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <textarea id="message" rows={4} placeholder="Tell us about your organization and partnership interests..." className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/70 resize-none" />
              </div>

              <Button className="w-full bg-white text-greensync-primary hover:bg-gray-100">
                Submit Partnership Inquiry
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-greensync-light">
              <p>Or reach out directly:</p>
              <div className="flex justify-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  partnerships@greensync.edu
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Partners;
