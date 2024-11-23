  "use client"
  import React, { useState } from 'react';
  import { Check, AlertCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/ui/navbar';

  // Mock data - In production, this would come from your API
  const insuranceSchemes = [
    {
      id: 1,
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      provider: "Government",
      coverageType: "Comprehensive",
      crops: ["Rice", "Wheat", "Pulses", "Cotton"],
      premium: "2% for Kharif, 1.5% for Rabi",
      maxCoverage: "Scale of Finance",
      description: "Comprehensive risk insurance to cover yield losses due to non-preventable risks."
    },
    {
      id: 2,
      name: "Weather Based Crop Insurance",
      provider: "AIC of India",
      coverageType: "Weather Index",
      crops: ["Cereals", "Pulses", "Oilseeds"],
      premium: "5% of sum insured",
      maxCoverage: "Based on weather parameters",
      description: "Insurance against adverse weather conditions like rainfall, temperature, humidity."
    }
  ];

  const InsuranceForm = ({ scheme, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      farmerName: "",
      aadhaarNumber: "",
      landSize: "",
      crop: "",
      season: "",
      village: "",
      bankAccount: "",
      ifscCode: "",
      phoneNumber: ""
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
      const newErrors = {};
      if (!formData.farmerName.trim()) newErrors.farmerName = "Name is required";
      if (!formData.aadhaarNumber.match(/^\d{12}$/)) newErrors.aadhaarNumber = "Invalid Aadhaar number";
      if (!formData.landSize || isNaN(formData.landSize)) newErrors.landSize = "Valid land size required";
      if (!formData.crop) newErrors.crop = "Crop selection required";
      if (!formData.season) newErrors.season = "Season selection required";
      if (!formData.bankAccount.match(/^\d{9,18}$/)) newErrors.bankAccount = "Invalid bank account number";
      if (!formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) newErrors.ifscCode = "Invalid IFSC code";
      if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = "Invalid phone number";
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSubmit({ ...formData, schemeId: scheme.id });
      } catch (error) {
        setErrors({ submit: "Failed to submit application. Please try again." });
      } finally {
        setSubmitting(false);
      }
    };

    return (
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Farmer's Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.farmerName ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
            />
            {errors.farmerName && <p className="text-red-500 text-sm mt-1">{errors.farmerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.aadhaarNumber}
              onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
              maxLength={12}
            />
            {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Land Size (Acres)</label>
            <input
              type="number"
              className={`w-full p-2 border rounded-md ${errors.landSize ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.landSize}
              onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
            />
            {errors.landSize && <p className="text-red-500 text-sm mt-1">{errors.landSize}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Crop</label>
            <select
              className={`w-full p-2 border rounded-md ${errors.crop ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
            >
              <option value="">Select Crop</option>
              {scheme.crops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
            {errors.crop && <p className="text-red-500 text-sm mt-1">{errors.crop}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Season</label>
            <select
              className={`w-full p-2 border rounded-md ${errors.season ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            >
              <option value="">Select Season</option>
              <option value="kharif">Kharif</option>
              <option value="rabi">Rabi</option>
              <option value="zaid">Zaid</option>
            </select>
            {errors.season && <p className="text-red-500 text-sm mt-1">{errors.season}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Number</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.bankAccount ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
            />
            {errors.bankAccount && <p className="text-red-500 text-sm mt-1">{errors.bankAccount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">IFSC Code</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
            />
            {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className={`w-full p-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              maxLength={10}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        {errors.submit && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.submit}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

  const InsuranceSchemeCard = ({ scheme }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (formData) => {
      // In production, this would make an API call to submit the application
      console.log('Submitting application:', formData);
      setSubmitted(true);
      setShowForm(false);
    };

    return (
      
      <Card className="mb-4">
        <CardHeader 
          className="cursor-pointer" 
          onClick={() => !showForm && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{scheme.name}</CardTitle>
            {!showForm && (isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
          </div>
        </CardHeader>
        
        {isExpanded && !showForm && (
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Provider</h4>
                  <p className="text-gray-600">{scheme.provider}</p>
                </div>
                <div>
                  <h4 className="font-medium">Coverage Type</h4>
                  <p className="text-gray-600">{scheme.coverageType}</p>
                </div>
                <div>
                  <h4 className="font-medium">Premium</h4>
                  <p className="text-gray-600">{scheme.premium}</p>
                </div>
                <div>
                  <h4 className="font-medium">Maximum Coverage</h4>
                  <p className="text-gray-600">{scheme.maxCoverage}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Eligible Crops</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scheme.crops.map((crop) => (
                    <span
                      key={crop}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600">{scheme.description}</p>

              {submitted ? (
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    Your application has been submitted successfully. You will receive further details via SMS.
                  </AlertDescription>
                </Alert>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply Now
                </button>
              )}
            </div>
          </CardContent>
        )}

        {showForm && (
          <CardContent>
            <InsuranceForm
              scheme={scheme}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        )}
      </Card>
    );
  };

  const CropInsurance = () => {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Crop Insurance Schemes</h1>
        
        <div className="space-y-4">
          {insuranceSchemes.map((scheme) => (
            <InsuranceSchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
      </div>
    );
  };

  export default CropInsurance;