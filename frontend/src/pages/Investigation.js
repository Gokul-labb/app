import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Plus,
  Building,
  Activity,
  FileText,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { mockCases, banksList } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const Investigation = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bankRequestForm, setBankRequestForm] = useState({
    bank: '',
    accountNumber: '',
    requestType: 'transaction_history',
    justification: ''
  });
  const [mlAnalysisRunning, setMlAnalysisRunning] = useState(false);
  const [newNote, setNewNote] = useState('');

  const case_ = mockCases.find(c => c.id === id);

  if (!case_) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h1>
            <Link to="/case-library">
              <Button>Back to Case Library</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBankRequest = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Bank Request Submitted",
        description: `Request sent to ${bankRequestForm.bank} for account ${bankRequestForm.accountNumber}`,
      });
      setBankRequestForm({ bank: '', accountNumber: '', requestType: 'transaction_history', justification: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit bank request",
        variant: "destructive"
      });
    }
  };

  const runMLAnalysis = async (type) => {
    setMlAnalysisRunning(true);
    try {
      // Simulate ML analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast({
        title: "Analysis Complete",
        description: `${type} analysis has been completed and results updated`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "ML analysis encountered an error",
        variant: "destructive"
      });
    } finally {
      setMlAnalysisRunning(false);
    }
  };

  const addInvestigationNote = () => {
    if (newNote.trim()) {
      toast({
        title: "Note Added",
        description: "Investigation note has been recorded",
      });
      setNewNote('');
    }
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
              <h1 className="text-4xl font-bold text-gray-900">Investigation Panel</h1>
              <p className="text-gray-600">Case: {case_.title} ({case_.id})</p>
            </div>
          </div>
          <Link to={`/case/${case_.id}`}>
            <Button variant="outline">
              View Case Details
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Investigation Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="bank-requests" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bank-requests">Bank Requests</TabsTrigger>
                <TabsTrigger value="ml-analysis">ML Analysis</TabsTrigger>
                <TabsTrigger value="suspect-accounts">Accounts</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="bank-requests" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Bank Data</CardTitle>
                    <CardDescription>
                      Submit formal requests to banks for transaction data and account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBankRequest} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="font-medium">Bank</label>
                          <Select 
                            value={bankRequestForm.bank} 
                            onValueChange={(value) => setBankRequestForm({...bankRequestForm, bank: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {banksList.map(bank => (
                                <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="font-medium">Account Number</label>
                          <Input
                            value={bankRequestForm.accountNumber}
                            onChange={(e) => setBankRequestForm({...bankRequestForm, accountNumber: e.target.value})}
                            placeholder="Enter account number"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="font-medium">Request Type</label>
                        <Select 
                          value={bankRequestForm.requestType} 
                          onValueChange={(value) => setBankRequestForm({...bankRequestForm, requestType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transaction_history">Transaction History</SelectItem>
                            <SelectItem value="account_details">Account Details</SelectItem>
                            <SelectItem value="kyc_documents">KYC Documents</SelectItem>
                            <SelectItem value="linked_accounts">Linked Accounts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="font-medium">Justification</label>
                        <Textarea
                          value={bankRequestForm.justification}
                          onChange={(e) => setBankRequestForm({...bankRequestForm, justification: e.target.value})}
                          placeholder="Provide justification for this data request..."
                          rows={3}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Bank Request
                      </Button>
                    </form>

                    {/* Recent Requests */}
                    <div className="mt-8">
                      <h3 className="font-semibold text-gray-900 mb-4">Recent Bank Requests</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">SBI - Account ending 4321</p>
                            <p className="text-sm text-gray-600">Transaction History Request</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">HDFC - Account ending 9123</p>
                            <p className="text-sm text-gray-600">KYC Documents Request</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ml-analysis" className="mt-6">
                <div className="space-y-6">
                  {/* Behavior Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>Behavior Analysis Model</span>
                      </CardTitle>
                      <CardDescription>
                        AI-powered analysis of transaction patterns and account behavior
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Behavior Risk Score</p>
                          <p className="text-3xl font-bold text-orange-600">
                            {case_.investigation.mlAnalysis?.behaviorScore || 0}%
                          </p>
                        </div>
                        <Button
                          onClick={() => runMLAnalysis('Behavior Analysis')}
                          disabled={mlAnalysisRunning}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          {mlAnalysisRunning ? 'Analyzing...' : 'Run Analysis'}
                        </Button>
                      </div>
                      {mlAnalysisRunning && (
                        <div className="mb-4">
                          <Progress value={60} className="w-full" />
                          <p className="text-sm text-gray-600 mt-2">Analyzing behavioral patterns...</p>
                        </div>
                      )}
                      {case_.investigation.mlAnalysis?.patterns && (
                        <div>
                          <p className="font-medium mb-2">Detected Patterns:</p>
                          <div className="space-y-1">
                            {case_.investigation.mlAnalysis.patterns.map((pattern, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {pattern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Mule Account Detection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>Mule Account Detection</span>
                      </CardTitle>
                      <CardDescription>
                        Machine learning model to identify probable mule accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Mule Accounts Detected</p>
                          <p className="text-3xl font-bold text-red-600">
                            {case_.investigation.suspectAccounts.filter(acc => acc.isMule).length}
                          </p>
                        </div>
                        <Button
                          onClick={() => runMLAnalysis('Mule Account Detection')}
                          disabled={mlAnalysisRunning}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {mlAnalysisRunning ? 'Scanning...' : 'Detect Mules'}
                        </Button>
                      </div>
                      {mlAnalysisRunning && (
                        <div className="mb-4">
                          <Progress value={40} className="w-full" />
                          <p className="text-sm text-gray-600 mt-2">Scanning for mule account indicators...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Analysis Results */}
                  {case_.investigation.mlAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Analysis Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600 mb-1">
                              {case_.investigation.mlAnalysis.behaviorScore}%
                            </div>
                            <div className="text-sm text-gray-600">Risk Score</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-red-600 mb-1">
                              {case_.investigation.mlAnalysis.riskLevel}
                            </div>
                            <div className="text-sm text-gray-600">Risk Level</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600 mb-1">
                              {case_.investigation.suspectAccounts.length}
                            </div>
                            <div className="text-sm text-gray-600">Accounts Found</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="suspect-accounts" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suspect Account Analysis</CardTitle>
                    <CardDescription>
                      Identified suspicious accounts and their risk assessments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {case_.investigation.suspectAccounts.length > 0 ? (
                      <div className="space-y-4">
                        {case_.investigation.suspectAccounts.map((account, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <Bank className="w-5 h-5 text-gray-400" />
                                <div>
                                  <h4 className="font-semibold text-gray-900">{account.accountNumber}</h4>
                                  <p className="text-sm text-gray-600">{account.bankName}</p>
                                  <p className="text-sm text-gray-600">Holder: {account.holderName}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-red-600 mb-2">
                                  Risk: {account.riskScore}%
                                </div>
                                {account.isMule && (
                                  <Badge className="bg-red-100 text-red-800">Mule Account</Badge>
                                )}
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Transaction Amount:</span>
                                <span className="ml-2 font-semibold">₹{account.transactionAmount.toLocaleString()}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Request More Data
                                </Button>
                                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                  Mark as Key Account
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Suspect Accounts Yet</h3>
                        <p className="text-gray-600 mb-4">
                          Run ML analysis or add bank data to identify suspect accounts
                        </p>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Request Bank Data
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investigation Notes</CardTitle>
                    <CardDescription>
                      Record your findings and observations during the investigation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add an investigation note..."
                          rows={3}
                        />
                        <Button onClick={addInvestigationNote} disabled={!newNote.trim()}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                      
                      {/* Sample Notes */}
                      <div className="space-y-3 mt-6">
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-gray-900">Initial Analysis Complete</p>
                            <span className="text-xs text-gray-500">Today, 2:30 PM</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Completed initial review of submitted evidence. Found strong indicators of fraudulent activity.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">By: {user?.name}</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-gray-900">Bank Response Received</p>
                            <span className="text-xs text-gray-500">Yesterday, 4:15 PM</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            SBI provided transaction details for account ending in 4321. Multiple suspicious transfers identified.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">By: {user?.name}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investigation Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Investigation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Evidence Collection</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bank Data Requests</span>
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ML Analysis</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspect Identification</span>
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Final Report</span>
                    <AlertTriangle className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Evidence
                </Button>
                <Button className="w-full" variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Request Assistance
                </Button>
              </CardContent>
            </Card>

            {/* Case Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Case Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{case_.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <Badge className="text-xs">{case_.priority}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Evidence Items:</span>
                  <span className="font-medium">{case_.evidence.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Suspect Accounts:</span>
                  <span className="font-medium">{case_.investigation.suspectAccounts.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investigation;