import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { User, ArrowLeft, Search, Bell } from 'lucide-react';
import Logo from './Logo';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const tabs = [
        { name: 'Home', path: '/' },
        { name: 'Symptom Checker', path: '/symptoms' },
        { name: 'Medicine Data', path: '/medicines' },
        { name: 'Home Remedies', path: '/remedies' },
        { name: 'Education Hub', path: '/education' },
        { name: 'Profile Info', path: '/profile' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
            {/* Full Width Main App Shell Container */}
            <div className="w-full flex-1 min-h-screen bg-white flex flex-col">
                
                {/* Top Header Bar */}
                <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {!isHome && (
                            <button 
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors mr-1"
                                aria-label="Go back"
                            >
                                <ArrowLeft size={22} />
                            </button>
                        )}
                        <button onClick={() => navigate('/')} className="focus:outline-none flex items-center">
                            <Logo />
                        </button>
                    </div>

                    {/* Top Right Actions */}
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => navigate('/symptoms')}
                            className="p-2.5 rounded-full text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            title="Search Symptoms"
                        >
                            <Search size={20} />
                        </button>

                        <button 
                            onClick={() => navigate('/settings')}
                            className="p-2.5 rounded-full text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors relative"
                            title="Notifications"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></span>
                        </button>

                        <button 
                            onClick={() => navigate('/profile')}
                            className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:border-orange-500 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-all focus:outline-none"
                            title="User Profile"
                        >
                            <User size={20} className="text-slate-600 group-hover:text-orange-600" />
                        </button>
                    </div>
                </header>

                {/* Horizontal Navigation Tab Bar (Arranged side-by-side with active underline indicator) */}
                <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 overflow-x-auto no-scrollbar shadow-xs">
                    <div className="flex items-center space-x-6 min-w-max">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.path}
                                to={tab.path}
                                end={tab.path === '/'}
                                className={({ isActive }) =>
                                    `py-3 text-sm font-semibold transition-all relative whitespace-nowrap flex flex-col items-center ${
                                        isActive
                                            ? 'text-slate-900 font-bold'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{tab.name}</span>
                                        {/* Active Underline Indicator (matches screenshot style) */}
                                        {isActive ? (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full transition-all duration-200"></span>
                                        ) : (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent rounded-full transition-all duration-200"></span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Main Body Content */}
                <main className="flex-1 flex flex-col px-6 py-6 bg-white max-w-7xl mx-auto w-full">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-100 py-3 text-center text-xs text-slate-400 bg-white">
                    Medinfo Mobile • Flat Minimal Design
                </footer>
            </div>
        </div>
    );
};

export default Layout;
