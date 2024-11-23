"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Navbar from '@/components/ui/navbar';

const schemes = [
  {
    category: "Financial Assistance",
    schemes: [
      {
        id: 1,
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        description: "Financial benefit of Rs. 6000/- per year transferred in three equal four-monthly installments into farmers' bank accounts through Direct Benefit Transfer (DBT) mode.",
        eligibility: [
          "Small and marginal farmers",
          "Own cultivable land",
          "Names in land records"
        ],
        applicationProcess: [
          "Register on PM-KISAN portal",
          "Submit land records",
          "Verify Aadhaar details"
        ],
        deadline: "Rolling basis",
        website: "https://pmkisan.gov.in"
      },
      {
        id: 2,
        name: "Pradhan Mantri Kisan MaanDhan Yojana (PM-KMY)",
        description: "Provides Rs. 3,000 monthly pension to enrolled farmers once they reach 60 years of age.",
        eligibility: [
          "Farmers between 18 to 40 years",
          "Must contribute Rs. 55 to Rs. 200 monthly until age 60"
        ],
        applicationProcess: [
          "Registration through CSC",
          "Registration through State Governments",
          "Managed by Life Insurance Corporation (LIC)"
        ],
        deadline: "Ongoing",
        website: "https://pmkmy.gov.in"
      },
      {
        id: 3,
        name: "Modified Interest Subvention Scheme (MISS)",
        description: "Loans up to Rs.3 lakh at 7% interest per annum for one year, with additional 3% subvention for prompt repayment.",
        eligibility: [
          "All farmers eligible for agricultural loans",
          "Must maintain good repayment record for additional benefits"
        ],
        applicationProcess: [
          "Apply through participating banks",
          "Submit required documents",
          "Maintain timely repayment for additional benefits"
        ],
        deadline: "Year-round",
        website: "https://agricoop.gov.in"
      },
      {
        id: 4,
        name: "Agriculture Infrastructure Fund (AIF)",
        description: "Medium-to-long-term debt financing facility for post-harvest management infrastructure and community farming assets.",
        eligibility: [
          "Farmers",
          "FPOs",
          "Agri-entrepreneurs",
          "Start-ups"
        ],
        applicationProcess: [
          "Apply through online portal",
          "Submit project proposal",
          "Get approval from lending institutions"
        ],
        deadline: "Ongoing",
        website: "https://agriinfra.dac.gov.in"
      }
    ]
  },
  {
    category: "Crop Insurance",
    schemes: [
      {
        id: 5,
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        description: "Comprehensive crop insurance product covering all non-preventable natural risks from pre-sowing to post-harvest.",
        eligibility: [
          "All farmers including sharecroppers and tenant farmers",
          "Must have insurable interest in crops",
          "Must be growing notified crops"
        ],
        applicationProcess: [
          "Visit nearest bank branch or insurance company",
          "Fill application form",
          "Submit required documents",
          "Pay premium amount"
        ],
        deadline: "Before sowing season",
        website: "https://pmfby.gov.in"
      }
    ]
  },
  {
    category: "Non Monetary Schemes",
    schemes: [
      {
        id: 6,
        name: "Soil Health Card Scheme (SHC)",
        description: "Provides farmers with Soil Health Cards detailing soil nutrient status and corrective measures to improve soil health.",
        eligibility: [
          "All farmers",
          "Must have agricultural land"
        ],
        applicationProcess: [
          "Apply through local agriculture office",
          "Submit soil samples",
          "Receive soil health card"
        ],
        deadline: "Throughout the year",
        website: "https://soilhealth.dac.gov.in"
      },
      {
        id: 7,
        name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
        description: "Expands irrigation area, improves on-farm water management, and enhances water efficiency.",
        eligibility: [
          "Farmers in selected areas",
          "Areas with irrigation potential"
        ],
        applicationProcess: [
          "Apply through state agriculture department",
          "Submit land details",
          "Get project approval"
        ],
        deadline: "As per state announcements",
        website: "https://pmksy.gov.in"
      },
      {
        id: 8,
        name: "National Agriculture Market (eNAM)",
        description: "Online trading platform connecting APMC mandis for better price discovery and transparent transactions.",
        eligibility: [
          "Farmers",
          "Traders",
          "FPOs"
        ],
        applicationProcess: [
          "Register on eNAM portal",
          "Upload produce details",
          "Participate in online trading"
        ],
        deadline: "Continuous",
        website: "https://enam.gov.in"
      }
    ]
  }
];

const SchemeCard = ({ scheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{scheme.name}</CardTitle>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{scheme.description}</p>
            
            <div>
              <h4 className="font-medium mb-2">Eligibility Criteria:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {scheme.eligibility.map((criteria, index) => (
                  <li key={index} className="text-gray-600">{criteria}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Application Process:</h4>
              <ul className="list-decimal pl-5 space-y-1">
                {scheme.applicationProcess.map((step, index) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Deadline: </span>
                <span className="text-gray-600">{scheme.deadline}</span>
              </div>
              <a 
                href={scheme.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                Visit Website
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(schemes.map(scheme => scheme.category))];

  const filteredSchemes = schemes
    .filter(categoryGroup => 
      selectedCategory === 'All' || categoryGroup.category === selectedCategory
    )
    .map(categoryGroup => ({
      ...categoryGroup,
      schemes: categoryGroup.schemes.filter(scheme =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(categoryGroup => categoryGroup.schemes.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-white">Government Schemes for Farmers</h1>
        
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search schemes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
          {filteredSchemes.map(categoryGroup => (
            <div key={categoryGroup.category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{categoryGroup.category}</h2>
              {categoryGroup.schemes.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;