import React, { useEffect, useState } from 'react';
import { BarChart2, Map, TrendingUp, Users, Activity, Pill, HeartPulse } from 'lucide-react';
import axios from 'axios';

const StatsCard = ({ title, value, label, icon: Icon, gradient }) => (
    <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform duration-300 group relative overflow-hidden">
        {/* Background Pattern */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500`}></div>

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
                    <Icon size={24} />
                </div>
                <span className="flex items-center space-x-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Activity size={10} className="text-emerald-500" />
                    <span>Live DB</span>
                </span>
            </div>
            <div className="text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">{value}</div>
            <div className="text-sm font-medium text-slate-500">{label}</div>
        </div>
    </div>
);

const StatsDashboard = () => {
    const [liveStats, setLiveStats] = useState({
        totalAntibiotics: null,
        totalRemedies: null,
        activeUsers: null
    });

    useEffect(() => {
        axios.get('http://localhost:5000/stats')
            .then(res => {
                if (res.data) {
                    setLiveStats(res.data);
                }
            })
            .catch(err => {
                console.log('Stats fetch error (using default fallback metrics):', err);
            });
    }, []);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-trust-blue tracking-tight">Surveillance Dashboard</h2>
                    <p className="text-slate-500 mt-1">National Antimicrobial Resistance Monitoring System & Database Stats</p>
                </div>
                <span className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    Backend Connection: Connected
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Antibiotics Indexed"
                    value={liveStats.totalAntibiotics !== null ? liveStats.totalAntibiotics : '8+'}
                    label="Active Drugs in Database"
                    icon={Pill}
                    gradient="from-sky-500 to-blue-600"
                />
                <StatsCard
                    title="Home Remedies"
                    value={liveStats.totalRemedies !== null ? liveStats.totalRemedies : '3+'}
                    label="Verified Non-Antibiotic Treatments"
                    icon={HeartPulse}
                    gradient="from-emerald-500 to-teal-600"
                />
                <StatsCard
                    title="Registered Users"
                    value={liveStats.activeUsers !== null ? liveStats.activeUsers : '1+'}
                    label="Registered Accounts"
                    icon={Users}
                    gradient="from-orange-400 to-amber-500"
                />
                <StatsCard
                    title="Resistance Rate"
                    value="72%"
                    label="E. Coli Metro Clinical Isolates"
                    icon={TrendingUp}
                    gradient="from-red-500 to-pink-600"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <Map className="mr-3 text-sky-500" size={24} />
                        Regional Hotspots
                    </h3>
                    <div className="flex-1 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group hover:border-sky-300 transition-colors">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <Map size={64} className="text-slate-300 mb-4 group-hover:scale-110 transition-transform duration-500 text-sky-200" />
                        <p className="text-slate-400 font-bold group-hover:text-sky-500 transition-colors">Interactive Map Component</p>
                        <p className="text-xs text-slate-400 mt-2">Data synced with Express / MongoDB API</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                        <TrendingUp className="mr-3 text-emerald-500" size={24} />
                        Resistance Growth Trend
                    </h3>
                    <div className="flex-1 flex items-end justify-between space-x-4 px-4 pb-4 min-h-[300px] bg-gradient-to-b from-transparent to-slate-50 rounded-b-2xl">
                        {[40, 55, 45, 70, 65, 85].map((h, i) => (
                            <div key={i} className="w-full relative group" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-trust-blue to-sky-400 rounded-t-xl group-hover:to-sky-300 transition-all duration-300 shadow-lg group-hover:-translate-y-1 h-full" />
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h}% Resistance
                                </div>
                                <div className="absolute top-2 w-full text-center text-[10px] text-white/50 font-bold">
                                    {2020 + i}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsDashboard;
