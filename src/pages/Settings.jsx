import React, { useState } from 'react';
import { Bell, ShieldCheck, Moon, Globe, HelpCircle, Smartphone, LogOut } from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [healthSync, setHealthSync] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [biometrics, setBiometrics] = useState(false);

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-900">Settings</h1>
                <p className="text-xs text-slate-500 mt-1">Application preferences & system configurations</p>
            </div>

            {/* Notification & Alerts */}
            <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferences</p>

                <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Bell size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Health Push Notifications</h3>
                                <p className="text-xs text-slate-500">Reminders for symptom tracking & medications</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${notifications ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                        </button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Health Data Sync</h3>
                                <p className="text-xs text-slate-500">Automatically backup scan logs securely</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setHealthSync(!healthSync)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${healthSync ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                        </button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Moon size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Dark Appearance</h3>
                                <p className="text-xs text-slate-500">Standard light theme recommended</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${darkMode ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                        </button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                <Smartphone size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Biometrics Unlock</h3>
                                <p className="text-xs text-slate-500">FaceID or Fingerprint login</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setBiometrics(!biometrics)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${biometrics ? 'bg-orange-500 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* General Info */}
            <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">About & Help</p>

                <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <Globe size={18} className="text-slate-500" />
                            <span className="text-sm font-medium text-slate-800">Language</span>
                        </div>
                        <span className="text-xs font-semibold text-orange-600">English (US)</span>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3">
                            <HelpCircle size={18} className="text-slate-500" />
                            <span className="text-sm font-medium text-slate-800">Help & Support</span>
                        </div>
                        <span className="text-xs text-slate-400">v2.4.0</span>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm">
                    <LogOut size={16} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Settings;
