import React from 'react';
import { BookOpen, FileText, AlertOctagon, Lightbulb, ShieldCheck } from 'lucide-react';

const EducationHub = () => {
    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                    <BookOpen size={20} className="text-orange-500" />
                    <h1 className="text-xl font-bold text-slate-900">Education Hub</h1>
                </div>
                <p className="text-xs text-slate-500">Public research and guidance on antimicrobial resistance stewardship</p>
            </div>

            {/* Banner */}
            <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-xs space-y-3">
                <div className="inline-block bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Stewardship Research
                </div>
                <h2 className="text-xl font-bold leading-tight">
                    Antimicrobial Resistance & Health Stewardship
                </h2>
                <p className="text-xs text-orange-100 leading-relaxed">
                    Investigating drug-resistant pathogen impacts to bridge clinical research data with public action.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                        <FileText size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Research Overview</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Explores the threat of drug-resistant pathogens and aims to reduce unnecessary antibiotic consumption through structured public awareness and clinical stewardship.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                        <AlertOctagon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Key Problem Statement</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Unregulated over-the-counter antimicrobial sales and self-medication accelerate resistance, causing standard treatable infections to become resilient to common therapy.
                    </p>
                </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <Lightbulb size={20} />
                </div>
                <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Preventing Resistance</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Always consult a certified healthcare practitioner before starting antimicrobials, complete full prescribed courses, and never share or save leftover medication.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center text-xs text-slate-400 pt-2">
                <ShieldCheck size={14} className="mr-1" />
                <span>Verified Public Health Education Content</span>
            </div>
        </div>
    );
};

export default EducationHub;
