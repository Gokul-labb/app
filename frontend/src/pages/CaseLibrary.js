import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { mockCases } from '../data/mockData';

const CaseLibrary = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter cases based on user role and filters
  const filteredCases = mockCases
    .filter(case_ => user?.role === 'admin' || !case_.confidential)
    .filter(case_ => {
      const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           case_.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
      const matchesType = typeFilter === 'all' || case_.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Investigation':
        return <Clock className="w-4 h-4" />;
      case 'Resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'New':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const caseTypes = [...new Set(mockCases.map(c => c.type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Case Library</h1>
          <p className="text-xl text-gray-600">
            {user?.role === 'admin' ? 'All cases including confidential records' : 'Non-confidential cases accessible to investigators'}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Search & Filter Cases</CardTitle>
            <CardDescription>
              Find specific cases using search terms and filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search cases by ID, title, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {caseTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Cases ({filteredCases.length})
            </h2>
            {user?.role === 'admin' && (
              <Button className="bg-orange-500 hover:bg-orange-600">
                Assign Case
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {case_.title}
                        </h3>
                        {case_.confidential && (
                          <Badge className="bg-red-100 text-red-800">
                            Confidential
                          </Badge>
                        )}
                        <Badge className={getPriorityColor(case_.priority)}>
                          {case_.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{case_.description}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Case ID: {case_.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Created: {new Date(case_.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>
                            {case_.assignedTo ? `Assigned to: ${case_.assignedTo}` : 'Unassigned'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>Type: {case_.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(case_.status)}
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/case/${case_.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        {case_.status === 'Under Investigation' && (
                          <Link to={`/investigation/${case_.id}`}>
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                              Investigate
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Evidence and Investigation Summary */}
                  <div className="border-t pt-4 mt-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Evidence Files:</span>
                        <span className="ml-2 text-gray-600">{case_.evidence.length} items</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Last Updated:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(case_.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Investigation Steps:</span>
                        <span className="ml-2 text-gray-600">
                          {case_.investigation.timeline.length} actions
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cases Found</h3>
                <p className="text-gray-600">
                  No cases match your current search criteria. Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseLibrary;