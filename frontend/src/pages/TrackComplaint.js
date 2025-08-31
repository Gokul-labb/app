import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import Navbar from '../components/Navbar';
import { mockComplaintStatuses } from '../data/mockData';

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = mockComplaintStatuses.find(complaint => 
        complaint.complaintId.toLowerCase() === complaintId.toLowerCase()
      );
      
      setSearchResult(result || null);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Investigation':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Additional Information Required':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Under Investigation':
        return 'default';
      case 'Resolved':
        return 'success';
      case 'Additional Information Required':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Complaint</h1>
            <p className="text-xl text-gray-600">
              Enter your complaint ID to check the current status and progress
            </p>
          </div>

          {/* Search Form */}
          <Card className="bg-white shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Complaint Status Lookup</CardTitle>
              <CardDescription>
                Enter the complaint ID provided when you filed your complaint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="complaintId">Complaint ID</Label>
                  <div className="flex gap-4">
                    <Input
                      id="complaintId"
                      value={complaintId}
                      onChange={(e) => setComplaintId(e.target.value)}
                      placeholder="Enter your complaint ID (e.g., CMP001)"
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                      disabled={loading}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Demo IDs */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Demo Complaint IDs for testing:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockComplaintStatuses.map((complaint) => (
                    <button
                      key={complaint.complaintId}
                      onClick={() => setComplaintId(complaint.complaintId)}
                      className="text-xs bg-white px-3 py-1 rounded border hover:bg-orange-50 hover:border-orange-200 transition-colors"
                    >
                      {complaint.complaintId}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searched && (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                {searchResult ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Complaint Details
                        </h2>
                        <p className="text-gray-600">Complaint ID: {searchResult.complaintId}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(searchResult.status)} className="text-sm">
                        {searchResult.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(searchResult.status)}
                          <div>
                            <h3 className="font-semibold text-gray-900">Current Status</h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {searchResult.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Last Updated</h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {new Date(searchResult.lastUpdate).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Complaint Registered</p>
                            <p className="text-sm text-gray-600">Your complaint has been successfully registered</p>
                          </div>
                        </div>
                        {searchResult.status !== 'Additional Information Required' && (
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">Under Review</p>
                              <p className="text-sm text-gray-600">Investigation team is reviewing your case</p>
                            </div>
                          </div>
                        )}
                        {searchResult.status === 'Under Investigation' && (
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">Investigation in Progress</p>
                              <p className="text-sm text-gray-600">Active investigation by cyber crime officers</p>
                            </div>
                          </div>
                        )}
                        {searchResult.status === 'Resolved' && (
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">Case Resolved</p>
                              <p className="text-sm text-gray-600">Investigation completed successfully</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Required Alert */}
                    {searchResult.status === 'Additional Information Required' && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Action Required:</strong> Additional information is needed to proceed with your case. 
                          Please check your email for detailed instructions or contact our helpline at 100.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Emergency Helpline:</p>
                          <p className="font-semibold text-orange-600">100</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Email Support:</p>
                          <p className="font-semibold text-orange-600">cybercrime@mppolice.gov.in</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Complaint Not Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find a complaint with the ID "{complaintId}". 
                      Please check the ID and try again.
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Make sure you entered the correct complaint ID</p>
                      <p>• Complaint IDs are case-sensitive</p>
                      <p>• If you're still having trouble, contact our helpline at 100</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Don't have a complaint ID yet?
            </p>
            <Link to="/file-complaint">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                File a New Complaint
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaint;