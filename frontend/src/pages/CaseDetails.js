import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { mockCases } from '../data/mockData';

const CaseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const case_ = mockCases.find(c => c.id === id);

  if (!case_) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h1>
            <p className="text-gray-600 mb-8">The requested case does not exist or you don't have permission to view it.</p>
            <Link to="/case-library">
              <Button>Back to Case Library</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if user can view confidential cases
  if (case_.confidential && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-8">This is a confidential case. Only administrators can view confidential cases.</p>
            <Link to="/case-library">
              <Button>Back to Case Library</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Investigation':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'New':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimelineIcon = (action) => {
    if (action.includes('registered')) return <FileText className="w-4 h-4" />;
    if (action.includes('assigned')) return <User className="w-4 h-4" />;
    if (action.includes('resolved')) return <CheckCircle className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{case_.title}</h1>
              <p className="text-gray-600">Case ID: {case_.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={getPriorityColor(case_.priority)}>
              {case_.priority} Priority
            </Badge>
            <Badge className={getStatusColor(case_.status)}>
              {case_.status}
            </Badge>
            {case_.confidential && (
              <Badge className="bg-red-100 text-red-800">
                Confidential
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="evidence">Evidence</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="investigation">Investigation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Overview</CardTitle>
                    <CardDescription>Detailed information about the cyber crime incident</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{case_.description}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Case Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{case_.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Created:</span>
                            <span className="font-medium">{new Date(case_.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">{new Date(case_.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Assigned Officer:</span>
                            <span className="font-medium">{case_.assignedTo || 'Unassigned'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Complainant Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{case_.complainant.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{case_.complainant.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{case_.complainant.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="evidence" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Files</CardTitle>
                    <CardDescription>Digital evidence submitted with the case</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {case_.evidence.map((evidence, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{evidence}</p>
                              <p className="text-sm text-gray-500">Uploaded with case registration</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investigation Timeline</CardTitle>
                    <CardDescription>Chronological log of all actions taken</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {case_.investigation.timeline.map((item, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              {getTimelineIcon(item.action)}
                            </div>
                            {index < case_.investigation.timeline.length - 1 && (
                              <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900">{item.action}</h3>
                              <span className="text-sm text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{item.details}</p>
                            <p className="text-xs text-gray-500">By: {item.officer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investigation" className="mt-6">
                <div className="space-y-6">
                  {/* ML Analysis */}
                  {case_.investigation.mlAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle>AI/ML Analysis Results</CardTitle>
                        <CardDescription>Machine learning insights and behavior analysis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600 mb-1">
                              {case_.investigation.mlAnalysis.behaviorScore}%
                            </div>
                            <div className="text-sm text-gray-600">Behavior Score</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-red-600 mb-1">
                              {case_.investigation.mlAnalysis.riskLevel}
                            </div>
                            <div className="text-sm text-gray-600">Risk Level</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600 mb-1">
                              {case_.investigation.mlAnalysis.patterns.length}
                            </div>
                            <div className="text-sm text-gray-600">Patterns Detected</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Detected Patterns:</h4>
                          <div className="space-y-1">
                            {case_.investigation.mlAnalysis.patterns.map((pattern, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {pattern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Suspect Accounts */}
                  {case_.investigation.suspectAccounts.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Suspect Accounts</CardTitle>
                        <CardDescription>Identified suspicious financial accounts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {case_.investigation.suspectAccounts.map((account, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{account.accountNumber}</h4>
                                  <p className="text-sm text-gray-600">{account.bankName}</p>
                                  <p className="text-sm text-gray-600">Holder: {account.holderName}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-red-600 mb-1">
                                    Risk: {account.riskScore}%
                                  </div>
                                  {account.isMule && (
                                    <Badge className="bg-red-100 text-red-800">Mule Account</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">
                                Transaction Amount: ₹{account.transactionAmount.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {case_.status === 'Under Investigation' && (
                  <Link to={`/investigation/${case_.id}`} className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Open Investigation Panel
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full">
                  Download Evidence
                </Button>
                {user?.role === 'admin' && case_.status === 'New' && (
                  <Button variant="outline" className="w-full">
                    Assign Officer
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Case Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Case Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Evidence Files</span>
                  <span className="font-semibold">{case_.evidence.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investigation Steps</span>
                  <span className="font-semibold">{case_.investigation.timeline.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Suspect Accounts</span>
                  <span className="font-semibold">{case_.investigation.suspectAccounts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Since Created</span>
                  <span className="font-semibold">
                    {Math.floor((new Date() - new Date(case_.createdAt)) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;