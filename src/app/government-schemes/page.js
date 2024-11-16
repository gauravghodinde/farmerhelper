"use client"
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Original schemes data remains the same
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

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
);

const ErrorAlert = ({ message }) => (
  <Alert variant="destructive" className="mb-6">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const LoanWaiverChart = ({ data }) => {
  const chartData = data.map(item => ({
    state: item.state_ut,
    amount: item.actual_amount_waived__rs__crore_
  }));

  return (
    <div className="h-96 w-full mt-4">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="state" />
          <YAxis label={{ value: 'Amount (₹ Crore)', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value) => `₹${value.toLocaleString()} Crore`}
            labelStyle={{ color: 'black' }}
          />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

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

const LoanWaiverCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            {data.state_ut} - {data.name_of_the_debt_waiver_scheme_since_2014}
          </CardTitle>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-blue-600">
              Amount Waived: ₹{data.actual_amount_waived__rs__crore_.toLocaleString()} Crore
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('schemes');
  const [loanWaiverData, setLoanWaiverData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://api.data.gov.in/resource/d7215e89-edc3-41ca-83bb-ce6fcc2be65a';
  const API_KEY = '';

  useEffect(() => {
    const fetchLoanWaiverData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("calign");
        const response = await fetch(`${API_URL}?api-key=${API_KEY}&format=json`);
        if (!response.ok) {
          throw new Error('Failed to fetch loan waiver data');
        }
        const data = await response.json();
        setLoanWaiverData(data.records);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching loan waiver data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'waivers') {
      fetchLoanWaiverData();
    }
  }, [activeTab]);

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

  const filteredLoanWaivers = loanWaiverData.filter(waiver =>
    waiver.state_ut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    waiver.name_of_the_debt_waiver_scheme_since_2014.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Government Schemes for Farmers</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'schemes'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Current Schemes
          </button>
          <button
            onClick={() => setActiveTab('waivers')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'waivers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Loan Waivers
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={activeTab === 'schemes' ? "Search schemes..." : "Search loan waivers..."}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {activeTab === 'schemes' && (
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
        )}
      </div>

      {activeTab === 'schemes' ? (
        filteredSchemes.map(categoryGroup => (
          <div key={categoryGroup.category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{categoryGroup.category}</h2>
            {categoryGroup.schemes.map(scheme => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ))
      ) : (
        <div>
          {error ? (
            <ErrorAlert message={error} />
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">State-wise Loan Waiver Distribution</h3>
                  <LoanWaiverChart data={loanWaiverData} />
                </CardContent>
              </Card>
              
              {filteredLoanWaivers.map((waiver, index) => (
                <LoanWaiverCard key={index} data={waiver} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;