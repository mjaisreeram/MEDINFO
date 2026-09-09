import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { Activity } from 'lucide-react';

// Lazy Load Pages
const MedinfoHome = lazy(() => import('./pages/MedinfoHome'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const MedicineBase = lazy(() => import('./pages/MedicineBase'));
const Remedies = lazy(() => import('./pages/Remedies'));
const EducationHub = lazy(() => import('./pages/EducationHub'));
const ProfileInfo = lazy(() => import('./pages/ProfileInfo'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading Fallback
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-3">
            <Activity className="text-orange-500 animate-spin" size={36} />
            <p className="text-slate-500 text-xs font-semibold animate-pulse">Loading Medinfo...</p>
        </div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<LoadingSpinner />}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MedinfoHome />} />
                            <Route path="/symptoms" element={<SymptomChecker />} />
                            <Route path="/medicines" element={<MedicineBase />} />
                            <Route path="/remedies" element={<Remedies />} />
                            <Route path="/education" element={<EducationHub />} />
                            <Route path="/profile" element={<ProfileInfo />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Layout>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
