"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Leaf, Droplets, Thermometer, FlaskConical } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch('https://agro-vmcr.onrender.com/predict-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      console.log(data);
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'nitrogen', value: Number(formData.nitrogen) || 0 },
    { name: 'phosphorus', value: Number(formData.phosphorus) || 0 },
    { name: 'potassium', value: Number(formData.potassium) || 0 },
    { name: 'ph', value: Number(formData.ph) * 10 || 0 },
    { name: 'rainfall', value: Number(formData.rainfall) / 10 || 0 },
    { name: 'temperature', value: Number(formData.temperature) || 0 },
    { name: 'humidity', value: Number(formData.humidity) || 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crop Prediction System</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Soil and Weather Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nitrogen (N)</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phosphorus (P)</label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Potassium (K)</label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Humidity (%)</label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">pH Level</label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rainfall (mm)</label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                    step="0.1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Leaf className="h-4 w-4" />
                    Predict Optimal Crop
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Recommended Crop
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {prediction.predicted_crop}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        Temperature
                      </h4>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {formData.temperature}°C
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        Humidity
                      </h4>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {formData.humidity}%
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                        <FlaskConical className="h-4 w-4" />
                        pH Level
                      </h4>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {formData.ph}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        Rainfall
                      </h4>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {formData.rainfall} mm
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Parameter Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CropPrediction;