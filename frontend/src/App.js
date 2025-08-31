import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ComplaintForm from "./pages/ComplaintForm";
import TrackComplaint from "./pages/TrackComplaint";
import Dashboard from "./pages/Dashboard";
import CaseLibrary from "./pages/CaseLibrary";
import CaseDetails from "./pages/CaseDetails";
import Investigation from "./pages/Investigation";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/file-complaint" element={<ComplaintForm />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/case-library" 
              element={
                <ProtectedRoute>
                  <CaseLibrary />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/case/:id" 
              element={
                <ProtectedRoute>
                  <CaseDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/investigation/:id" 
              element={
                <ProtectedRoute>
                  <Investigation />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;