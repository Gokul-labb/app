import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    incidentType: '',
    incidentDate: '',
    description: '',
    evidenceFiles: [],
    financialLoss: '',
    suspectInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const incidentTypes = [
    'Financial Fraud/Online Banking Fraud',
    'Social Media Account Hacking',
    'Email Account Hacking',
    'Online Shopping Fraud',
    'UPI/Digital Payment Fraud',
    'Cyber Stalking/Harassment',
    'Data Theft',
    'Fake Website/Phishing',
    'Online Investment Scam',
    'Other'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      incidentType: value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      evidenceFiles: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedId = 'CMP' + Math.random().toString(36).substr(2, 6).toUpperCase();
      setComplaintId(generatedId);
      setSubmitted(true);
      
      toast({
        title: "Complaint Filed Successfully",
        description: `Your complaint ID is ${generatedId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Complaint Submitted Successfully
                </h1>
                <p className="text-gray-600 mb-6">
                  Your complaint has been registered with the Madhya Pradesh Cyber Crime Police.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="text-sm text-gray-600 mb-2">Your Complaint ID</div>
                  <div className="text-2xl font-bold text-orange-500">{complaintId}</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Please save this ID for future reference
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    You will receive an email confirmation within 24 hours. 
                    Our investigation team will review your case and contact you if additional information is needed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/track-complaint">
                      <Button className="w-full sm:w-auto">
                        Track Your Complaint
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">File a Cyber Crime Complaint</h1>
            <p className="text-xl text-gray-600">
              Please provide accurate information to help us investigate your case effectively
            </p>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Complaint Details</CardTitle>
              <CardDescription>
                All fields marked with * are mandatory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91-9876543210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Your address"
                      />
                    </div>
                  </div>
                </div>

                {/* Incident Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Incident Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incidentType">Type of Cyber Crime *</Label>
                      <Select onValueChange={handleSelectChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent>
                          {incidentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incidentDate">Date of Incident *</Label>
                      <Input
                        id="incidentDate"
                        name="incidentDate"
                        type="date"
                        value={formData.incidentDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Provide a detailed description of the incident..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="financialLoss">Financial Loss (if any)</Label>
                      <Input
                        id="financialLoss"
                        name="financialLoss"
                        type="number"
                        value={formData.financialLoss}
                        onChange={handleInputChange}
                        placeholder="Amount in INR"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="evidenceFiles">Upload Evidence</Label>
                      <Input
                        id="evidenceFiles"
                        name="evidenceFiles"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      <p className="text-xs text-gray-500">
                        Upload screenshots, documents, or other evidence (Max 10MB per file)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suspectInfo">Suspect Information (if known)</Label>
                    <Textarea
                      id="suspectInfo"
                      name="suspectInfo"
                      value={formData.suspectInfo}
                      onChange={handleInputChange}
                      placeholder="Any information about the suspect (phone numbers, email addresses, social media profiles, etc.)"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Important Notice */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please ensure all information provided is accurate. False complaints are punishable under Indian law.
                    Your complaint will be reviewed by our cyber crime investigation team within 24-48 hours.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;