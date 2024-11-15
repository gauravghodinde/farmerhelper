"use client"
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Loader2, 
  Leaf, 
  Sprout, 
  AlertTriangle,
  Info,
  RefreshCw,
  Camera
} from 'lucide-react';

const PlantDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  // Mock disease detection results for demo
  const mockDetection = {
    disease: "Late Blight",
    confidence: 92.5,
    description: "A fungal disease affecting tomato and potato plants, causing dark brown spots on leaves and stems.",
    remedies: [
      {
        type: "Chemical",
        products: [
          "Copper-based fungicide",
          "Chlorothalonil",
          "Mancozeb"
        ],
        instructions: "Apply every 7-10 days during wet weather conditions."
      },
      {
        type: "Organic",
        products: [
          "Neem oil",
          "Copper soap",
          "Bacillus subtilis"
        ],
        instructions: "Apply weekly as a preventive measure."
      }
    ],
    fertilizers: [
      {
        name: "Balanced NPK (10-10-10)",
        purpose: "Support overall plant health",
        application: "Apply 2-3 inches away from plant base"
      },
      {
        name: "Calcium-rich fertilizer",
        purpose: "Strengthen cell walls",
        application: "Foliar spray every 14 days"
      }
    ],
    preventiveMeasures: [
      "Improve air circulation between plants",
      "Water at the base of plants",
      "Remove infected plant debris",
      "Rotate crops annually"
    ]
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setError(null);
      } else {
        setError('Please select an image file');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-blue-500');
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    } else {
      setError('Please drop an image file');
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would upload the image and get results from your API
      // const formData = new FormData();
      // formData.append('image', selectedImage);
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      
      setResults(mockDetection);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Leaf Disease Detection & Treatment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Plant Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-gray-500">
                  Supports: JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Selected plant"
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Leaf className="h-4 w-4" />
                          Analyze Image
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {results && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Disease Detection Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-800">
                      {results.disease}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-red-500 rounded"
                          style={{ width: `${results.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-red-800">
                        {results.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-red-700 mt-2">
                      {results.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.remedies.map((remedy, index) => (
                      <div
                        key={index}
                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        <h4 className="text-sm font-semibold text-green-800 flex items-center gap-2">
                          <Sprout className="h-4 w-4" />
                          {remedy.type} Treatment
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {remedy.products.map((product, idx) => (
                            <li key={idx} className="text-sm text-green-700">
                              • {product}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-green-700 mt-2">
                          {remedy.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800">
                      Recommended Fertilizers
                    </h4>
                    <div className="mt-2 space-y-3">
                      {results.fertilizers.map((fertilizer, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-blue-700">
                            {fertilizer.name}
                          </p>
                          <p className="text-blue-600">
                            Purpose: {fertilizer.purpose}
                          </p>
                          <p className="text-blue-600 text-xs">
                            Application: {fertilizer.application}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800">
                      Preventive Measures
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {results.preventiveMeasures.map((measure, index) => (
                        <li
                          key={index}
                          className="text-sm text-yellow-700 flex items-start gap-2"
                        >
                          <span className="select-none">•</span>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDiseaseDetection;