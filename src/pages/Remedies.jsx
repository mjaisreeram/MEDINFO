import React, { useState, useEffect } from 'react';
import { Search, HeartPulse, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import axios from 'axios';

const Remedies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [remediesData, setRemediesData] = useState([]);

    // Default fallback data in case backend server is offline
    const defaultRemedies = [
        {
            id: '1',
            ailment: 'Common Cold & Cough',
            remedies: [
                {
                    name: 'Honey and Warm Ginger Tea',
                    description: 'Soothes throat irritation and helps relieve upper respiratory coughing.',
                    ingredients: ['Ginger', 'Honey', 'Warm Water'],
                    duration: '2-3 times daily'
                },
                {
                    name: 'Steam Inhalation',
                    description: 'Clears nasal congestion and relaxes airways.',
                    ingredients: ['Hot Water', 'Eucalyptus Oil (optional)'],
                    duration: '10 mins daily'
                }
            ],
            warning: 'Seek medical attention if fever persists beyond 3 days.'
        },
        {
            id: '2',
            ailment: 'Sore Throat',
            remedies: [
                {
                    name: 'Warm Saltwater Gargle',
                    description: 'Reduces inflammation and cleanses throat pathogens naturally.',
                    ingredients: ['Warm Water', '1/2 tsp Salt'],
                    duration: 'Every 4 hours'
                }
            ],
            warning: 'If throat swelling hinders breathing or swallowing, visit urgent care immediately.'
        },
        {
            id: '3',
            ailment: 'Mild Indigestion & Nausea',
            remedies: [
                {
                    name: 'Peppermint or Chamomile Infusion',
                    description: 'Relaxes gastrointestinal muscles and calms uneasy stomach.',
                    ingredients: ['Chamomile Tea', 'Mint Leaves'],
                    duration: 'After meals'
                }
            ],
            warning: 'Do not use for severe persistent abdominal pain.'
        }
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/remedies")
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setRemediesData(res.data);
                } else {
                    setRemediesData(defaultRemedies);
                }
            })
            .catch(() => setRemediesData(defaultRemedies));
    }, []);

    const filteredRemedies = remediesData.filter(item =>
        item.ailment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.remedies.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                    <HeartPulse size={20} className="text-orange-500" />
                    <h1 className="text-xl font-bold text-slate-900">Home Remedies</h1>
                </div>
                <p className="text-xs text-slate-500">Trusted self-care treatments for everyday ailments</p>
            </div>

            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by ailment (e.g., Cold, Sore Throat)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>

            {/* Remedies List */}
            <div className="space-y-4">
                {filteredRemedies.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                        <div className="p-4 bg-orange-50/60 border-b border-orange-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center">
                                <Shield className="mr-2 text-orange-500" size={16} />
                                {item.ailment}
                            </h3>
                            <span className="text-[10px] font-semibold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full uppercase">
                                Verified Remedy
                            </span>
                        </div>

                        <div className="p-4 space-y-4">
                            {item.remedies.map((remedy, idx) => (
                                <div key={idx} className="space-y-2 border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                                    <h4 className="font-semibold text-slate-900 text-xs">{remedy.name}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">{remedy.description}</p>
                                    
                                    <div className="flex flex-wrap gap-1">
                                        {remedy.ingredients.map(ing => (
                                            <span key={ing} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-orange-600 font-semibold flex items-center pt-1">
                                        <ArrowRight size={10} className="mr-1" />
                                        Frequency: {remedy.duration}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {item.warning && (
                            <div className="p-3 bg-amber-50 border-t border-amber-100 flex items-start space-x-2 text-[11px] text-amber-800">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={14} />
                                <span>{item.warning}</span>
                            </div>
                        )}
                    </div>
                ))}

                {filteredRemedies.length === 0 && (
                    <div className="text-center py-10 text-slate-400">
                        <p className="text-sm">No remedies found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Remedies;
