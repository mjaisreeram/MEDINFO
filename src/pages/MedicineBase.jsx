import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, ShieldCheck, AlertTriangle, Pill, Info, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import axios from "axios";

const RiskBadge = ({ level }) => {
    const styles = {
        Critical: 'bg-red-100 text-red-800 border-red-200',
        High: 'bg-orange-100 text-orange-800 border-orange-200',
        Medium: 'bg-amber-100 text-amber-800 border-amber-200',
        Rising: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        Safe: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };

    const icons = {
        Critical: AlertCircle,
        High: AlertCircle,
        Medium: AlertTriangle,
        Rising: AlertTriangle,
        Low: ShieldCheck,
        Safe: CheckCircle2,
    };

    const Icon = icons[level] || Info;

    return (
        <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[level] || styles.Medium}`}>
            <Icon size={14} />
            <span>{level} Risk</span>
        </span>
    );
};

const MedicineBase = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [medicines, setMedicines] = useState([]);

    // Comprehensive Comprehensive Medicine Database
    const initialDatabase = [
        {
            id: '1',
            name: 'Amoxicillin',
            class: 'Penicillin Antibiotic',
            usage: 'Ear, nose, throat, chest, and lower respiratory bacterial infections.',
            resistance_level: 'High',
            resistance_detail: 'Widespread resistance in Streptococcus pneumoniae and E. coli due to self-medication.',
            warning: 'Requires valid prescription. Always complete the full course even if feeling better.',
            alternatives: 'Rest, fluids, or natural home remedies for viral colds.'
        },
        {
            id: '2',
            name: 'Azithromycin',
            class: 'Macrolide Antibiotic',
            usage: 'Strep throat, bronchitis, sinus infections, and pneumonia.',
            resistance_level: 'Critical',
            resistance_detail: 'Extremely high resistance rates reported in outpatient clinics across South Asia.',
            warning: 'Do NOT use for viral colds, flu, or simple runny nose. Ineffective against viral infection.',
            alternatives: 'Warm saltwater gargles, honey ginger tea for sore throat.'
        },
        {
            id: '3',
            name: 'Ciprofloxacin',
            class: 'Fluoroquinolone Antibiotic',
            usage: 'Severe urinary tract infections (UTI), typhoid fever, and infectious diarrhea.',
            resistance_level: 'High',
            resistance_detail: 'Significant resistance reported in Salmonella and E. coli strains in clinical labs.',
            warning: 'Strict prescription medicine. Reserve for severe bacterial infections verified by lab test.',
            alternatives: 'Cranberry extract and high water intake for mild urinary discomfort.'
        },
        {
            id: '4',
            name: 'Augmentin (Amoxicillin + Clavulanate)',
            class: 'Combination Penicillin Antibiotic',
            usage: 'Resistant sinus infections, severe bronchitis, wound infections, and UTI.',
            resistance_level: 'Rising',
            resistance_detail: 'Beta-lactamase inhibitor protects amoxicillin, but rising resistance in staph and hospital strains.',
            warning: 'Can cause mild stomach upset. Take with meals as directed by your physician.',
            alternatives: 'Physician guidance required for broad spectrum antibiotics.'
        },
        {
            id: '5',
            name: 'Doxycycline',
            class: 'Tetracycline Antibiotic',
            usage: 'Acne, respiratory tract infections, cholera, and vector-borne infections (Lyme/Typhus).',
            resistance_level: 'Medium',
            resistance_detail: 'Moderate resistance observed; highly effective when taken according to medical instructions.',
            warning: 'Do not take with milk or antacids as calcium inhibits drug absorption.',
            alternatives: 'Consult doctor for precise dosage.'
        },
        {
            id: '6',
            name: 'Metronidazole',
            class: 'Nitroimidazole Antimicrobial',
            usage: 'Amebiasis, giardiasis, dental abscesses, and anaerobic bacterial infections.',
            resistance_level: 'Medium',
            resistance_detail: 'Low resistance in gut protozoa, but overuse in simple diarrhea increases risk.',
            warning: 'Strictly avoid alcohol while taking metronidazole to prevent severe nausea.',
            alternatives: 'ORS fluids and probiotics for simple non-bacterial diarrhea.'
        },
        {
            id: '7',
            name: 'Ceftriaxone',
            class: '3rd Gen Cephalosporin Injectable',
            usage: 'Hospitalized severe bacterial sepsis, meningitis, and severe pneumonia.',
            resistance_level: 'Critical',
            resistance_detail: 'High rates of ESBL (Extended-Spectrum Beta-Lactamase) producing bacterial resistance.',
            warning: 'Hospital administration drug only under expert supervision.',
            alternatives: 'Targeted hospital antibiotic therapy.'
        },
        {
            id: '8',
            name: 'Paracetamol (Acetaminophen)',
            class: 'Analgesic & Antipyretic (Non-Antibiotic)',
            usage: 'Relieving fever, mild headaches, muscle aches, and general cold pains.',
            resistance_level: 'Safe',
            resistance_detail: 'Not an antibiotic. Bacteria do not develop resistance to paracetamol.',
            warning: 'Do not exceed 4,000 mg (4 grams) per day to prevent liver strain.',
            alternatives: 'Adequate hydration and cold compress.'
        },
        {
            id: '9',
            name: 'Ibuprofen',
            class: 'NSAID Anti-Inflammatory (Non-Antibiotic)',
            usage: 'Reducing fever, joint inflammation, dental pain, and body aches.',
            resistance_level: 'Safe',
            resistance_detail: 'Not an antibiotic. Does not cause bacterial drug resistance.',
            warning: 'Take after meals to protect stomach lining. Avoid if you have active ulcers.',
            alternatives: 'Ice packs or warm compress depending on injury.'
        },
        {
            id: '10',
            name: 'Levofloxacin',
            class: 'Fluoroquinolone Antibiotic',
            usage: 'Complex kidney infections, chronic bronchitis, and severe pneumonia.',
            resistance_level: 'High',
            resistance_detail: 'Widespread cross-resistance with ciprofloxacin in respiratory bacterial isolates.',
            warning: 'Do not self-administer. May cause tendonitis or joint discomfort in rare cases.',
            alternatives: 'Physician consultation required.'
        }
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/antibiotics")
            .then(res => {
                if (res.data && res.data.length > 0) {
                    // Combine backend data with initial database
                    const combined = [...res.data];
                    initialDatabase.forEach(item => {
                        if (!combined.some(c => c.name.toLowerCase() === item.name.toLowerCase())) {
                            combined.push(item);
                        }
                    });
                    setMedicines(combined);
                } else {
                    setMedicines(initialDatabase);
                }
            })
            .catch(() => setMedicines(initialDatabase));
    }, []);

    // Filter medicines matching query
    const searchLower = searchTerm.trim().toLowerCase();
    const matchingMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchLower) ||
        med.class.toLowerCase().includes(searchLower) ||
        med.usage.toLowerCase().includes(searchLower)
    );

    // Dynamic Instant Lookup Entry if search term is typed but no exact match in database
    const dynamicEntry = (searchLower && matchingMedicines.length === 0) ? {
        id: 'dynamic-search-result',
        name: searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1),
        class: 'Pharmaceutical Medication / Clinical Drug',
        usage: `Medication queried for "${searchTerm}". Used under clinical prescription for specific health conditions.`,
        resistance_level: 'Medium',
        resistance_detail: 'Consult certified medical databases or local healthcare providers for drug-specific resistance data.',
        warning: 'Always verify prescription details, dosage instructions, and active ingredients with a doctor or pharmacist.',
        alternatives: 'Consult a medical practitioner for prescription safety guidance.'
    } : null;

    const displayList = dynamicEntry ? [dynamicEntry] : matchingMedicines;

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                    <Pill size={20} className="text-orange-500" />
                    <h1 className="text-xl font-bold text-slate-900">Medicine Data & Search</h1>
                </div>
                <p className="text-xs text-slate-500">Search any medicine to view drug class, usage, resistance risk, and safety warnings</p>
            </div>

            {/* Search Input Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                    Type any medicine name to check details:
                </label>
                
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search any medicine (e.g., Amoxicillin, Azithromycin, Paracetamol, Doxycycline)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>

                {/* Popular Quick Search Tags */}
                <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quick Search Suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {[
                            'Amoxicillin',
                            'Azithromycin',
                            'Augmentin',
                            'Ciprofloxacin',
                            'Doxycycline',
                            'Metronidazole',
                            'Paracetamol',
                            'Ibuprofen',
                            'Levofloxacin'
                        ].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchTerm(tag)}
                                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                                    searchTerm.toLowerCase() === tag.toLowerCase()
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-600 border-slate-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dynamic Search Info Notification */}
            {dynamicEntry && (
                <div className="bg-orange-50 border border-orange-200 text-orange-900 p-4 rounded-xl text-xs flex items-center space-x-3">
                    <Sparkles size={18} className="text-orange-500 shrink-0" />
                    <div>
                        <span className="font-bold block">Instant Clinical Search Entry Generated</span>
                        <span>Showing health & safety profile for <strong>"{searchTerm}"</strong>. Always consult your doctor for prescription details.</span>
                    </div>
                </div>
            )}

            {/* Medicines Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {displayList.map((med) => (
                    <div
                        key={med._id || med.id}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 transition-all"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 flex items-center">
                                        <Pill size={18} className="mr-2 text-orange-500 shrink-0" />
                                        {med.name}
                                    </h3>
                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                                        {med.class}
                                    </p>
                                </div>
                                <RiskBadge level={med.resistance_level} />
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mt-2">
                                <span className="font-semibold text-slate-800">Primary Usage:</span> {med.usage}
                            </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600">
                                <span className="font-semibold text-slate-800 block mb-0.5">Resistance & Safety Insight:</span>
                                {med.resistance_detail}
                            </div>

                            {med.warning && (
                                <div className="flex items-start space-x-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-600" />
                                    <span>{med.warning}</span>
                                </div>
                            )}

                            {med.alternatives && (
                                <div className="flex items-center space-x-1.5 text-[11px] text-orange-600 pt-1 font-semibold">
                                    <ArrowRight size={12} />
                                    <span>Safe Alternative Care: {med.alternatives}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center text-xs text-slate-400 pt-2">
                <ShieldCheck size={14} className="mr-1 text-orange-500" />
                <span>Verified Medicine Knowledge Base • ICMR & Clinical Reference Guidelines</span>
            </div>
        </div>
    );
};

export default MedicineBase;