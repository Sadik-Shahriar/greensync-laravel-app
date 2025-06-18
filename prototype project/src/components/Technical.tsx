
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, QrCode, Settings, ShieldCheck } from 'lucide-react';

interface TechnicalProps {
  className?: string;
}

const Technical: React.FC<TechnicalProps> = ({ className }) => {
  const techComponents = [
    {
      icon: <QrCode className="h-8 w-8 text-greensync-primary" />,
      title: "Authentication System",
      items: [
        "QR Code Stickers for bin authentication",
        "User Registration system for universities and schools",
        "Secure authentication flow"
      ]
    },
    {
      icon: <Settings className="h-8 w-8 text-greensync-primary" />,
      title: "Hardware Components",
      items: [
        "Smart waste-detection sensors (Ultrasonic HC-SR04)",
        "Weight sensors to measure deposited waste",
        "Arduino microcontrollers with Wi-Fi/Bluetooth modules",
        "LED indicators & speaker alerts for user feedback"
      ]
    },
    {
      icon: <Database className="h-8 w-8 text-greensync-primary" />,
      title: "Software & AI",
      items: [
        "AI-powered image recognition for waste classification",
        "Deep learning models for enhanced accuracy",
        "Mobile applications for Android and iOS",
        "Administrative web dashboard for monitoring"
      ]
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-greensync-primary" />,
      title: "Security & Data Management",
      items: [
        "Encrypted cloud storage solution",
        "Dual-verification system to prevent fraudulent scans",
        "Real-time data syncing capabilities",
        "Analytics dashboard for waste management insights"
      ]
    }
  ];

  const detectionMethods = [
    {
      title: "Image Processing-Based Detection",
      description: "AI-powered image recognition for waste classification with advanced computer vision algorithms"
    },
    {
      title: "Deep Learning-Based Detection",
      description: "Advanced neural networks for enhanced accuracy in waste identification and sorting"
    },
    {
      title: "IoT & Sensor-Based Detection",
      description: "Smart bins with ultrasonic and AI-powered waste sensors to verify correct disposal"
    }
  ];

  return (
    <section id="technical" className={cn("py-16 bg-muted", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Technical <span className="text-greensync-primary">Architecture</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The innovative technology powering GreenSync's waste management solution
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {techComponents.map((component, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {component.icon}
                <CardTitle>{component.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {component.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-500">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Waste Detection Methodologies</h3>
            <p className="mx-auto max-w-[700px] text-gray-500">
              Our multi-layered approach to waste detection ensures accuracy and prevents fraudulent usage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detectionMethods.map((method, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-3 text-greensync-primary">{method.title}</h4>
                <p className="text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Risk Assessment & Mitigation</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-greensync-primary/10">
                  <th className="py-3 px-4 text-left font-semibold">Risk</th>
                  <th className="py-3 px-4 text-left font-semibold">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Low User Engagement</td>
                  <td className="py-3 px-4">Awareness campaigns and reward-based incentives</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Sensor Malfunction</td>
                  <td className="py-3 px-4">AI-based error detection and redundant verification mechanisms</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">System Exploitation (Fraudulent QR Scans)</td>
                  <td className="py-3 px-4">Dual-verification with QR scan and real-time sensor activation</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Data Security Concerns</td>
                  <td className="py-3 px-4">Encrypted cloud storage with strict access control measures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technical;
