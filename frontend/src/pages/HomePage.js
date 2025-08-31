import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, BarChart3, Phone, Mail, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/Navbar';
import { stats, emergencyContacts } from '../data/mockData';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Cyber Complaint &
              <br />
              <span className="text-orange-400">Investigation Portal</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              Madhya Pradesh Police - Protecting Citizens in Digital Space
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl">
              Secure, fast, and reliable platform for reporting cybercrime incidents. 
              Our advanced investigation tools and AI-powered analysis ensure swift justice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/file-complaint">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  <FileText className="w-5 h-5 mr-2" />
                  File Complaint Now
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                >
                  Officer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.casesResolved}+</div>
                <div className="text-sm text-gray-600">Cases Resolved</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.activeOfficers}</div>
                <div className="text-sm text-gray-600">Active Officers</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.responseTime}</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.successRate}</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive cybercrime investigation and prevention services powered by AI and ML
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-4">File Complaint</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Report cybercrime incidents with evidence upload and OTP verification
                </CardDescription>
                <Link to="/file-complaint">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl mb-4">Track Status</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Monitor your complaint progress and investigation updates
                </CardDescription>
                <Link to="/track-complaint">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl mb-4">Emergency Help</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  24/7 emergency cybercrime helpline support
                </CardDescription>
                <Button variant="outline" className="w-full">Call Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Investigation Features */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Investigation Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by AI/ML for efficient cybercrime resolution
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">  
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-4">Secure Evidence Upload</CardTitle>
                <CardDescription className="text-gray-600">
                  End-to-end encrypted file uploads with digital forensics support
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-4">AI-Powered Analysis</CardTitle>
                <CardDescription className="text-gray-600">
                  Machine learning algorithms detect fraud patterns and suspicious transactions
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-4">Real-time Collaboration</CardTitle>
                <CardDescription className="text-gray-600">
                  Multi-officer case management with live updates and notifications
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Emergency Contact</h2>
            <p className="text-xl text-gray-300">24/7 cybercrime helpline and support</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Helpline</h3>
              <div className="text-3xl font-bold text-orange-400 mb-2">{emergencyContacts.helpline}</div>
              <p className="text-gray-300">Available 24/7</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <div className="text-lg text-orange-400 mb-2">{emergencyContacts.email}</div>
              <p className="text-gray-300">Response within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Head Office</h3>
              <div className="text-lg text-orange-400 mb-2">Cyber Crime Police Station</div>
              <p className="text-gray-300">Bhopal, Madhya Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-orange-500" />
              <span>Madhya Pradesh Police - Cyber Division</span>
            </div>
            <div className="text-gray-400">
              © 2024 Government of Madhya Pradesh. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;