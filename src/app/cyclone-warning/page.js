"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Wind,
  AlertTriangle,
  Navigation,
  Clock,
  ThermometerSun,
  Droplets,
  ArrowRight,
  MapPin,
  Shield,
  Home,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CycloneWarningSystem = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('coastal-region-1');

  // Mock cyclone data - replace with real API data
  const mockCycloneData = {
    id: "CYC-2024-001",
    name: "Cyclone Marcus",
    severity: "severe",
    category: 4,
    currentStatus: {
      windSpeed: 195, // km/h
      pressure: 920, // hPa
      rainfall: 300, // mm
      temperature: 27, // °C
      humidity: 85, // %
      movement: "SW",
      movementSpeed: 15, // km/h
    },
    location: {
      latitude: "15.2°S",
      longitude: "120.5°E",
      distanceFromCoast: 150, // km
    },
    forecast: {
      path: [
        { time: "12:00", position: "15.2°S, 120.5°E", intensity: "Severe" },
        { time: "18:00", position: "15.5°S, 120.2°E", intensity: "Severe" },
        { time: "00:00", position: "15.8°S, 119.9°E", intensity: "Very Severe" },
      ],
      expectedIntensification: true,
    },
    warnings: [
      {
        type: "Red Alert",
        areas: ["Coastal Region 1", "Coastal Region 2"],
        description: "Imminent severe impact expected. Take immediate shelter.",
      }
    ],
    safetyMeasures: [
      "Evacuate to designated shelters immediately",
      "Secure loose objects around properties",
      "Stock up on essential supplies",
      "Keep emergency contacts handy",
      "Monitor official communications",
      "Avoid coastal areas",
      "Fill vehicles with fuel",
      "Charge all communication devices",
    ],
    emergencyContacts: [
      { name: "Emergency Response", number: "000" },
      { name: "Storm Control Room", number: "1800-111-222" },
      { name: "Medical Emergency", number: "1800-333-444" },
    ],
  };

  // Mock historical wind speed data for graph
  const mockHistoricalData = [
    { time: '00:00', windSpeed: 160 },
    { time: '03:00', windSpeed: 175 },
    { time: '06:00', windSpeed: 185 },
    { time: '09:00', windSpeed: 190 },
    { time: '12:00', windSpeed: 195 },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentAlert(mockCycloneData);
        setHistoricalData(mockHistoricalData);
      } catch (error) {
        console.error('Error fetching cyclone data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-yellow-500',
      moderate: 'bg-orange-500',
      severe: 'bg-red-500',
      'very severe': 'bg-purple-500',
    };
    return colors[severity.toLowerCase()] || 'bg-gray-500';
  };

  const getWarningBgColor = (type) => {
    const colors = {
      'Red Alert': 'bg-red-50 border-red-200',
      'Orange Alert': 'bg-orange-50 border-orange-200',
      'Yellow Alert': 'bg-yellow-50 border-yellow-200',
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Cyclone Warning System</h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="coastal-region-1">Coastal Region 1</option>
            <option value="coastal-region-2">Coastal Region 2</option>
            <option value="coastal-region-3">Coastal Region 3</option>
          </select>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {currentAlert && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Alert Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-6 w-6" />
                Active Cyclone Warning
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-red-800">
                  {currentAlert.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColor(currentAlert.severity)}`}>
                  Category {currentAlert.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Wind className="h-5 w-5" />
                    <span>Wind Speed</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.currentStatus.windSpeed} km/h
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Navigation className="h-5 w-5" />
                    <span>Movement</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.currentStatus.movement} at {currentAlert.currentStatus.movementSpeed} km/h
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="h-5 w-5" />
                    <span>Distance from Coast</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.location.distanceFromCoast} km
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Wind Speed Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="windSpeed"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Current Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.temperature}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.humidity}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.pressure} hPa</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-indigo-500" />
                    <span>Rainfall</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.rainfall} mm</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Forecast Track</h4>
                <div className="space-y-3">
                  {currentAlert.forecast.path.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium">{point.time}</div>
                        <div className="text-sm text-gray-600">{point.position}</div>
                        <div className="text-sm text-gray-600">{point.intensity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warnings and Safety Measures */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Warnings & Safety Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {currentAlert.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${getWarningBgColor(warning.type)}`}
                    >
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {warning.type}
                      </h4>
                      <p className="text-sm mt-1">{warning.description}</p>
                      <div className="text-sm mt-2">
                        Affected areas: {warning.areas.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Safety Measures</h4>
                  <ul className="space-y-2">
                    {currentAlert.safetyMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-4 w-4 mt-1 text-blue-500" />
                        <span className="text-sm">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentAlert.emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-blue-600 font-bold">{contact.number}</span>
                  </div>
                ))}
              </div>

              <Alert className="mt-6">
                <AlertDescription>
                  Stay tuned to local radio and TV broadcasts for updates. Follow instructions
                  from emergency services and local authorities.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CycloneWarningSystem;