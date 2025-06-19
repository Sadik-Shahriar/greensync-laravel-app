
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I start earning eco-points with GreenSync?",
          answer: "Simply sign up for a GreenSync account, locate a smart bin on your campus, and scan the QR code with your smartphone. After properly disposing your waste, you'll automatically earn eco-points based on the type and amount of waste disposed."
        },
        {
          question: "What types of waste can I dispose of in GreenSync bins?",
          answer: "GreenSync smart bins accept various waste types including plastic bottles, paper, cardboard, organic waste, and metal cans. Each bin is clearly labeled with accepted materials, and our sensors verify proper sorting."
        },
        {
          question: "Is GreenSync free to use?",
          answer: "Yes! GreenSync is completely free for students, faculty, and staff at participating institutions. Your institution covers the costs as part of their sustainability initiative."
        }
      ]
    },
    {
      category: "Earning & Redeeming Points",
      questions: [
        {
          question: "How are eco-points calculated?",
          answer: "Eco-points are awarded based on the type of waste, proper sorting accuracy, and disposal frequency. Plastic bottles earn 5 points, paper items earn 3 points, organic waste earns 4 points, and metal cans earn 6 points. Bonus points are given for consistent daily usage."
        },
        {
          question: "What rewards can I redeem with my eco-points?",
          answer: "You can redeem eco-points for digital badges, campus store discounts, dining hall credits, priority parking passes, and exclusive sustainability merchandise. Special rewards include Eco-Steward Certificates and recognition ceremonies."
        },
        {
          question: "Do my eco-points expire?",
          answer: "No, your eco-points never expire! However, leaderboard rankings are calculated monthly, and some limited-time rewards may have expiration dates."
        }
      ]
    },
    {
      category: "Eco-Steward Certification",
      questions: [
        {
          question: "What is the Eco-Steward Certification?",
          answer: "The Eco-Steward Certification is a prestigious recognition awarded to users who reach 1,000 eco-points and demonstrate consistent sustainable behavior. It includes a downloadable certificate, special badge, and exclusive access to sustainability leadership programs."
        },
        {
          question: "How long does it take to earn the certification?",
          answer: "The time varies based on your disposal frequency and accuracy. Active users typically earn certification within 2-3 months of regular participation. The certification recognizes both quantity and quality of sustainable actions."
        }
      ]
    },
    {
      category: "Waste Verification",
      questions: [
        {
          question: "How does GreenSync verify proper waste disposal?",
          answer: "Our smart bins use advanced sensors and AI-powered image recognition to verify waste type and proper sorting. The system provides instant feedback and only awards points for correctly disposed items."
        },
        {
          question: "What happens if I dispose waste incorrectly?",
          answer: "If waste is disposed incorrectly, the system will provide educational feedback but won't award points. Repeated incorrect disposal may trigger additional educational resources to help improve sorting accuracy."
        }
      ]
    },
    {
      category: "Institutional Participation",
      questions: [
        {
          question: "How can my institution join GreenSync?",
          answer: "Institutions can join by contacting our partnerships team at partnerships@greensync.edu. We provide custom deployment plans, training for staff, and ongoing support to ensure successful implementation."
        },
        {
          question: "What equipment is needed to implement GreenSync?",
          answer: "We provide smart bins with built-in sensors, QR codes, and connectivity hardware. Institutions need reliable internet connectivity and designated bin locations. Our team handles installation and maintenance."
        },
        {
          question: "Can GreenSync integrate with existing campus systems?",
          answer: "Yes! GreenSync can integrate with existing campus ID systems, mobile apps, and sustainability reporting platforms. We work with your IT team to ensure seamless integration."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      action: "Chat available 9 AM - 5 PM"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      action: "support@greensync.edu"
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Help Center",
      description: "Browse detailed guides and tutorials",
      action: "Visit Help Center →"
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about GreenSync's waste management system, 
            rewards program, and sustainability initiatives.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-greensync-primary">
                {category.category}
              </h3>
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${categoryIndex}-${index}`}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50">
                          <span className="font-medium">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Support Options */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-gray-600">Our support team is here to help you succeed with GreenSync</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-2 p-3 bg-greensync-light rounded-full w-fit">
                    <div className="text-greensync-primary">
                      {option.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="text-sm font-medium text-greensync-primary">
                    {option.action}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-greensync-primary text-white rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-4">Quick Tips for Success</h3>
            <p className="text-greensync-light">Maximize your eco-impact with these pro tips</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium mb-1">Quick Scan</div>
              <div className="text-sm text-greensync-light">Keep your camera ready for faster QR scanning</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🗂️</div>
              <div className="font-medium mb-1">Sort Smart</div>
              <div className="text-sm text-greensync-light">Check bin labels before disposing for maximum points</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium mb-1">Daily Habit</div>
              <div className="text-sm text-greensync-light">Consistent daily participation earns bonus rewards</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-medium mb-1">Track Progress</div>
              <div className="text-sm text-greensync-light">Monitor your dashboard to stay motivated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
