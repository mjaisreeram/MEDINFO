import React from 'react';
import { Info, Code2, Layers, Shield } from 'lucide-react';

const AboutSection = () => {
    return (
        <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-trust-blue mb-4">About the Project</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">Bridging the gap between clinical data and public awareness through modern technology.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-sky-900/5 transition-shadow">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-trust-blue rounded-2xl shadow-lg shadow-slate-300">
                            <Shield className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-trust-blue">AMR Guard</h2>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Mission Statement</p>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        AMR Guard is designed strictly for the <strong className="text-trust-blue">Indian pharmaceutical landscape</strong>.
                        Our goal is to democratize access to critical resistance data, empowering regular citizens to make informed decisions
                        and understand the risks of unprescribed antibiotic usage.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-sky-900/5 transition-shadow">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-sky-500 rounded-2xl shadow-lg shadow-sky-200">
                            <Code2 className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-trust-blue">Technical Core</h2>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Development Methodology</p>
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        This project rigorously follows the <strong className="text-sky-600">Spiral Model</strong> for development.
                        This iterative approach allows for continuous risk analysis, refinement of the "Symptom-to-Action" logic,
                        and rapid adaptation to new resistance data coming from our research partners.
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-trust-blue to-slate-800 p-8 rounded-3xl shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                        <Layers size={32} className="text-sky-300" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Open Source Initiative</h3>
                        <p className="text-slate-300">Contribute to the fight against superbugs.</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-sky-900/50">
                    View Repository
                </button>
            </div>
        </div>
    );
};

export default AboutSection;
