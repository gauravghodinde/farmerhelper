"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Mock data - In production, this would come from your API
const schemes = [
  {
    category: "Crop Insurance",
    schemes: [
      {
        id: 1,
        name: "Pradhan Mantri Fasal Bima Yojana",
        description: "Provides comprehensive insurance coverage against crop failure",
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
    category: "Financial Assistance",
    schemes: [
      {
        id: 2,
        name: "PM-KISAN",
        description: "Direct income support of ₹6000 per year to farmer families",
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Government Schemes for Farmers</h1>
      
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
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredSchemes.map(categoryGroup => (
        <div key={categoryGroup.category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{categoryGroup.category}</h2>
          {categoryGroup.schemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GovernmentSchemes;