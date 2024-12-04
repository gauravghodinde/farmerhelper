import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Shield, 
  Sprout, 
  Cloud, 
  Bug, 
  Bell 
} from 'lucide-react';

const LearnMorePage = () => {
  const features = [
    {
      title: "Government Schemes",
      icon: <Shield className="w-12 h-12 text-emerald-600" />,
      description: "Access comprehensive information about various government initiatives designed to support farmers. Our platform simplifies the complex application processes and keeps you updated about new schemes, deadlines, and eligibility criteria.",
      benefits: [
        "Real-time updates on new schemes",
        "Step-by-step application guidance",
        "Eligibility checker tool",
        "Document requirement lists"
      ]
    },
    {
      title: "Crop Insurance",
      icon: <Sprout className="w-12 h-12 text-emerald-600" />,
      description: "Protect your agricultural investments with our detailed crop insurance information system. Compare different insurance plans, understand coverage options, and make informed decisions to safeguard your crops.",
      benefits: [
        "Insurance plan comparisons",
        "Premium calculators",
        "Claim process guidance",
        "Coverage analysis tools"
      ]
    },
    {
      title: "Crop Prediction",
      icon: <Cloud className="w-12 h-12 text-emerald-600" />,
      description: "Leverage advanced analytics to determine the most suitable crops for your land. Our prediction system considers soil health, weather patterns, and historical data to recommend optimal crop choices.",
      benefits: [
        "Soil-type analysis",
        "Weather pattern integration",
        "Yield predictions",
        "Season-wise recommendations"
      ]
    },
    {
      title: "Disease Detection",
      icon: <Bug className="w-12 h-12 text-emerald-600" />,
      description: "Early detection of crop diseases can save your entire harvest. Our advanced detection system helps identify potential threats and provides immediate solution recommendations.",
      benefits: [
        "Image-based disease detection",
        "Treatment recommendations",
        "Preventive measures",
        "Expert consultation access"
      ]
    },
    {
      title: "Cyclone Warning",
      icon: <Bell className="w-12 h-12 text-emerald-600" />,
      description: "Stay prepared for adverse weather conditions with our early warning system. Receive timely alerts about approaching cyclones and get detailed preparation guidelines to protect your farms.",
      benefits: [
        "Real-time weather alerts",
        "Preparation guidelines",
        "Emergency contact information",
        "Post-cyclone recovery tips"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover the Power of GreenGuide
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Explore our comprehensive suite of tools and features designed to revolutionize your farming experience. Each feature is crafted to address specific challenges faced by modern farmers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {feature.icon}
                  <ArrowRight className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <h4 className="font-semibold text-emerald-700 mb-2">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default LearnMorePage;