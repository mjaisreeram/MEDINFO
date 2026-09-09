import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Pill, 
    TrendingUp, 
    Activity, 
    ShieldAlert, 
    Search, 
    ShieldCheck, 
    ArrowRight,
    CheckCircle2,
    HeartPulse,
    Sparkles
} from 'lucide-react';

const MedinfoHome = () => {
    const navigate = useNavigate();

    // Sleek Metrics Bar Data (Quick Stats)
    // Soft pale orange tinted cards with bold, bright orange numbers & icons
    const quickStats = [
        {
            number: '1.27 Million',
            label: 'Global Annual Deaths',
            detail: 'Directly attributed to antibiotic resistance',
            icon: ShieldAlert,
        },
        {
            number: 'Azithromycin',
            label: 'Most Misused Pill',
            detail: 'Overprescribed for viral coughs and cold',
            icon: Pill,
        },
        {
            number: '5% – 15%',
            label: 'Yearly Resistance Rise',
            detail: 'Annual increase in bacterial resistance',
            icon: TrendingUp,
        },
        {
            number: '6 Pathogens',
            label: 'ICMR India Focus',
            detail: 'Key bacteria tracked across hospital network',
            icon: Activity,
        },
    ];

    // Core Flow Section (3-Step Horizontal Process)
    const coreFlow = [
        {
            step: '01',
            title: '1. Search Medicine',
            description: 'Enter any antibiotic or medicine name to inspect clinical data, prescribed usage, and resistance alerts.',
            icon: Search,
        },
        {
            step: '02',
            title: '2. Analyze Risk',
            description: 'Evaluate resistance levels and understand whether your symptoms genuinely require antibiotic treatment.',
            icon: ShieldAlert,
        },
        {
            step: '03',
            title: '3. View Safe Alternatives',
            description: 'Discover verified natural home remedies and self-care options for mild viral colds and flus.',
            icon: HeartPulse,
        },
    ];

    return (
        <div className="w-full space-y-16 py-4 bg-white font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            {/* Pristine white background with centered dark grey headline, subtle grey subheadline, vibrant orange pill button */}
            <section className="py-12 md:py-16 text-center space-y-6 max-w-4xl mx-auto px-4 bg-white">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold">
                    <Sparkles size={14} className="text-orange-500" />
                    <span>Healthcare Information & Antimicrobial Stewardship</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Understanding & Combating <br className="hidden sm:inline" />
                    <span className="text-slate-900">Antibiotic Resistance</span>
                </h1>

                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                    Preventing antibiotic misuse through clear clinical guidance, medicine risk analysis, and natural home remedies.
                </p>

                <div className="pt-4 flex justify-center">
                    <button
                        onClick={() => navigate('/medicines')}
                        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-sm hover:shadow transition-all flex items-center space-x-3 cursor-pointer group"
                    >
                        <span>Check a Medicine</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* 2. METRICS BAR (QUICK STATS) */}
            {/* 4-column horizontal grid, soft pale orange tinted background cards with bright bold orange numbers & icons */}
            <section className="space-y-4">
                <div className="text-center space-y-1">
                    <h2 className="text-xs font-bold text-orange-600 uppercase tracking-widest">Live Data Overview</h2>
                    <p className="text-xl font-bold text-slate-900">Key Impact Metrics</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickStats.map((stat, idx) => {
                        const IconComp = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-orange-50/60 rounded-2xl p-6 transition-all hover:bg-orange-50 flex flex-col justify-between space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-white text-orange-500 shadow-2xs flex items-center justify-center">
                                        <IconComp size={22} className="text-orange-500" />
                                    </div>
                                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        Metric
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-orange-500 tracking-tight">
                                        {stat.number}
                                    </p>
                                    <h3 className="text-sm font-bold text-slate-900">
                                        {stat.label}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {stat.detail}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 3. CORE FLOW SECTION */}
            {/* Clean 3-step horizontal section on white background with minimalist orange icons */}
            <section className="py-8 space-y-8 bg-white border-t border-slate-100">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900">How Medinfo Works</h2>
                    <p className="text-xs md:text-sm text-slate-500">
                        Follow three simple steps to check medicines, evaluate risk, and find safe care options.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 relative">
                    {coreFlow.map((flow, idx) => {
                        const FlowIcon = flow.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:border-orange-400 transition-all flex flex-col justify-between space-y-4 group relative"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <FlowIcon size={24} />
                                    </div>
                                    <span className="text-xs font-extrabold text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                                        STEP {flow.step}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                        {flow.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {flow.description}
                                    </p>
                                </div>

                                <div className="pt-2 flex items-center text-xs font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
                                    <span>Learn more</span>
                                    <ArrowRight size={14} className="ml-1" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4. PRACTICAL GUIDANCE SECTION */}
            <section className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100/60 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Why Antibiotic Stewardship Matters</h3>
                        <p className="text-xs text-slate-500 mt-1">Simple guidelines to protect yourself and your family</p>
                    </div>
                    <button 
                        onClick={() => navigate('/symptoms')}
                        className="btn-orange text-xs py-2.5 px-5 self-start md:self-auto shrink-0"
                    >
                        <span>Start Symptoms Scanner</span>
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 text-xs text-slate-700">
                    <div className="p-4 bg-white rounded-xl border border-orange-100 flex items-start space-x-3 shadow-2xs">
                        <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block font-bold text-slate-900 mb-0.5">Bacteria vs Viruses</strong>
                            <span>Antibiotics only kill bacteria. They are ineffective for common cold or flu viruses.</span>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-orange-100 flex items-start space-x-3 shadow-2xs">
                        <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block font-bold text-slate-900 mb-0.5">Doctor Prescription</strong>
                            <span>Never buy or take antibiotics without a doctor prescribing them specifically for you.</span>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-orange-100 flex items-start space-x-3 shadow-2xs">
                        <CheckCircle2 size={18} className="text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block font-bold text-slate-900 mb-0.5">Complete the Dose</strong>
                            <span>Always finish your entire prescribed dosage, even if symptoms vanish early.</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MedinfoHome;
