import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, Mail, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-lg">
      {/* Top bar with contact info */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>100 (Emergency)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>cybercrime@mppolice.gov.in</span>
            </div>
          </div>
          <div className="text-orange-400">
            साइबर अपराध मित्र पोर्टल - मध्य प्रदेश पुलिस
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-xl font-bold">Cyber Complaint Portal</h1>
              <p className="text-sm text-gray-300">Madhya Pradesh Police</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/case-library" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Case Library
                </Link>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                  <span className="text-orange-400">({user.role})</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Officer Login
                  </Button>
                </Link>
                <Link to="/file-complaint">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    File Complaint
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;