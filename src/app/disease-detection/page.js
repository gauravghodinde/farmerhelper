"use client";
import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Loader2,
  Leaf,
  RefreshCw,
  Camera,
  AlertTriangle,
  Info,
} from "lucide-react";
import Navbar from "@/components/ui/navbar";

const PlantDiseaseDetection = () => {
  const [plantType, setPlantType] = useState(""); // Selected plant type
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const plantTypes = [
    "apple",
    "bell_pepper",
    "blueberry",
    "cherry",
    "corn",
    "grape",
    "peach",
    "potato",
    "raspberry",
    "soyabean",
    "squash",
    "strawberry",
    "tomato",
    "rice",
    "wheat",
    "sugarcane",
    "coffee",
    "tea",
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setError(null);
      } else {
        setError("Please select an image file");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-blue-500");

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    } else {
      setError("Please drop an image file");
    }
  };

  const handleSubmit = async () => {
    if (!plantType) {
      setError("Please select a plant type.");
      return;
    }

    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      const response = await fetch(
        `https://agro-vmcr.onrender.com/detect-disease/${plantType}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze image.");
      }

      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlantType("");
    setSelectedImage(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          Leaf Disease Detection & Treatment
        </h1>

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
                <select
                  value={plantType}
                  onChange={(e) => setPlantType(e.target.value)}
                  className="w-full mb-4 p-2 border rounded-md"
                >
                  <option value="">Select Plant Type</option>
                  {plantTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

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
                      <p className="text-sm text-blue-700 mt-2">
                        {results.fertilizer_recommendation}
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800">
                        Treatment Recommendations
                      </h4>
                      <p className="text-sm text-yellow-700 mt-2">
                        {results.treatment_recommendation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDiseaseDetection;
