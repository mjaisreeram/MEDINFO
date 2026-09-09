import React, { useState } from 'react';
import { 
    Stethoscope, 
    AlertTriangle, 
    CheckCircle, 
    Search, 
    ArrowRight, 
    ShieldAlert, 
    Activity, 
    Thermometer,
    RefreshCw,
    Pill,
    HeartPulse
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
    const navigate = useNavigate();
    const [symptom, setSymptom] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const performAnalysis = (queryText) => {
        const text = (queryText || symptom).trim().toLowerCase();
        if (!text) return;

        setIsScanning(true);
        setResult(null);

        setTimeout(() => {
            setIsScanning(false);
            
            if (text.includes('urinary') || text.includes('uti') || text.includes('burning') || text.includes('frequent urination')) {
                setResult({
                    type: 'bacterial',
                    title: 'Possible Bacterial Infection',
                    message: 'Possible Urinary Tract Infection (UTI)',
                    detail: 'Burning during urination and frequent urge to pass urine often indicate a bacterial UTI. A lab urine test is recommended before starting treatment.',
                    antibioticsNeeded: 'Consult Doctor First',
                    recommendations: [
                        'Drink plenty of water (8-10 glasses daily).',
                        'Avoid caffeine, alcohol, and spicy foods.',
                        'Visit a doctor for a simple urine test before taking antibiotics.'
                    ],
                    badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
                    icon: AlertTriangle,
                    remediesLink: true
                });
            } else if (text.includes('pneumonia') || text.includes('chest pain') || text.includes('green phlegm') || text.includes('yellow phlegm') || text.includes('high fever')) {
                setResult({
                    type: 'urgent',
                    title: 'Urgent Medical Attention Needed',
                    message: 'Possible Lower Respiratory Infection',
                    detail: 'High fever accompanied by chest discomfort or colored phlegm requires direct clinical evaluation by a medical professional.',
                    antibioticsNeeded: 'Doctor Examination Required',
                    recommendations: [
                        'Seek immediate medical care at a clinic or hospital.',
                        'Rest and keep your head elevated while sleeping.',
                        'Do not self-prescribe antibiotics.'
                    ],
                    badgeColor: 'bg-red-100 text-red-700 border-red-200',
                    icon: ShieldAlert,
                    remediesLink: false
                });
            } else if (text.includes('cold') || text.includes('flu') || text.includes('runny nose') || text.includes('sneezing') || text.includes('watery eyes')) {
                setResult({
                    type: 'viral',
                    title: 'Viral Illness - Rest & Home Care',
                    message: 'Likely Common Cold or Viral Infection',
                    detail: 'Sneezing, runny nose, and light body aches are classic signs of a viral cold. Antibiotics do NOT kill viruses.',
                    antibioticsNeeded: 'NOT Needed',
                    recommendations: [
                        'Rest well and drink warm fluids like tea or soup.',
                        'Try warm steam inhalation or salt water gargles.',
                        'Use natural home remedies for symptom relief.'
                    ],
                    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    icon: CheckCircle,
                    remediesLink: true
                });
            } else if (text.includes('sore throat') || text.includes('scratchy throat') || text.includes('throat pain')) {
                setResult({
                    type: 'viral',
                    title: 'Likely Viral Sore Throat',
                    message: 'Sore Throat',
                    detail: 'Most sore throats are caused by common cold viruses. If severe pain occurs with high fever, a strep test may be advised by a doctor.',
                    antibioticsNeeded: 'Usually NOT Needed',
                    recommendations: [
                        'Gargle with warm salt water 3-4 times a day.',
                        'Honey and warm ginger tea can soothe throat irritation.',
                        'Consult a doctor if throat pain lasts longer than 4 days.'
                    ],
                    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    icon: CheckCircle,
                    remediesLink: true
                });
            } else if (text.includes('fever') || text.includes('chills') || text.includes('body ache')) {
                setResult({
                    type: 'monitor',
                    title: 'Monitor Temperature & Rest',
                    message: 'Fever & Body Aches',
                    detail: 'Fever is your body naturally fighting off an infection. Stay hydrated and monitor your temperature carefully.',
                    antibioticsNeeded: 'Medical Evaluation Needed if Fever Persists',
                    recommendations: [
                        'Drink plenty of fluids to avoid dehydration.',
                        'Use cold compresses on forehead if temperature rises.',
                        'Consult a physician if fever exceeds 102°F or lasts > 48 hours.'
                    ],
                    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
                    icon: Thermometer,
                    remediesLink: true
                });
            } else if (text.includes('stomach') || text.includes('diarrhea') || text.includes('vomiting') || text.includes('nausea')) {
                setResult({
                    type: 'viral',
                    title: 'Stomach Bug / Viral Gastroenteritis',
                    message: 'Stomach Upset & Nausea',
                    detail: 'Mild stomach upsets are usually viral or food-related and settle within 24-48 hours with proper fluid replacement.',
                    antibioticsNeeded: 'NOT Needed for Standard Cases',
                    recommendations: [
                        'Drink ORS (Oral Rehydration Solution) or coconut water.',
                        'Eat simple, bland foods like rice, bananas, or toast.',
                        'Seek emergency care if severe abdominal pain or blood occurs.'
                    ],
                    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    icon: CheckCircle,
                    remediesLink: true
                });
            } else if (text.includes('skin') || text.includes('wound') || text.includes('pus') || text.includes('redness') || text.includes('cut')) {
                setResult({
                    type: 'bacterial',
                    title: 'Possible Skin Bacterial Infection',
                    message: 'Skin Redness or Wound Infection',
                    detail: 'A wound with spreading redness, warmth, or pus requires evaluation by a medical doctor to check for skin bacteria.',
                    antibioticsNeeded: 'Doctor Consultation Recommended',
                    recommendations: [
                        'Clean the wound gently with mild soap and clean water.',
                        'Cover with a sterile bandage and keep clean and dry.',
                        'Show the wound to a doctor before applying antibiotic creams.'
                    ],
                    badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
                    icon: AlertTriangle,
                    remediesLink: false
                });
            } else {
                setResult({
                    type: 'general',
                    title: 'General Health Guidance',
                    message: 'Symptom Assessment Result',
                    detail: 'Your described symptoms have been logged. For accurate medical diagnosis, always consult a certified healthcare professional.',
                    antibioticsNeeded: 'Consult Doctor',
                    recommendations: [
                        'Keep track of when symptoms started and any changes.',
                        'Stay well-hydrated and rest.',
                        'Visit a local clinic if symptoms worsen or persist.'
                    ],
                    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
                    icon: ShieldAlert,
                    remediesLink: true
                });
            }
        }, 600);
    };

    const handleTagClick = (tagText) => {
        setSymptom(tagText);
        performAnalysis(tagText);
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                    <Stethoscope size={20} className="text-orange-500" />
                    <h1 className="text-xl font-bold text-slate-900">Symptoms Scanner</h1>
                </div>
                <p className="text-xs text-slate-500">Scan your symptoms instantly for guidance and care tips</p>
            </div>

            {/* Scanner Input Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <label className="block text-xs font-semibold text-slate-700">
                    Describe your symptoms:
                </label>
                
                <div className="relative">
                    <input
                        type="text"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="e.g., runny nose, fever, sore throat, stomach ache..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        onKeyDown={(e) => e.key === 'Enter' && performAnalysis()}
                    />
                    <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>

                {/* Quick Suggestion Tags */}
                <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tap to Scan Common Symptoms:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {[
                            'Runny nose & cold', 
                            'Sore throat', 
                            'Fever & body ache', 
                            'Urinary burning',
                            'Stomach upset',
                            'Cough & phlegm'
                        ].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="text-xs bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200 hover:border-orange-300 px-3 py-1.5 rounded-xl transition-colors font-medium"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => performAnalysis()}
                    disabled={!symptom.trim() || isScanning}
                    className="w-full btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isScanning ? (
                        <>
                            <RefreshCw size={18} className="animate-spin" />
                            <span>Scanning Symptoms...</span>
                        </>
                    ) : (
                        <>
                            <span>Scan Symptoms Now</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Scanning State Loader */}
            {isScanning && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center space-y-3 animate-pulse">
                    <Activity size={32} className="mx-auto text-orange-500 animate-bounce" />
                    <p className="text-xs font-semibold text-orange-700">Analyzing symptoms against medical database...</p>
                </div>
            )}

            {/* Scan Results Card */}
            {result && !isScanning && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${result.badgeColor}`}>
                            {result.title}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">Scan Complete</span>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                            <result.icon size={24} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900">{result.message}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">{result.detail}</p>
                        </div>
                    </div>

                    {/* Antibiotic Advice Card */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 flex items-center">
                            <Pill size={16} className="mr-2 text-orange-500" />
                            Antibiotics Status:
                        </span>
                        <span className="font-bold text-orange-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                            {result.antibioticsNeeded}
                        </span>
                    </div>

                    {/* Care & Self-Care Recommendations */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recommended Next Steps:</h4>
                        <ul className="space-y-1.5">
                            {result.recommendations.map((rec, i) => (
                                <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5"></span>
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Link to Remedies if applicable */}
                    {result.remediesLink && (
                        <div className="pt-2">
                            <button
                                onClick={() => navigate('/remedies')}
                                className="w-full btn-outline-orange py-2.5 text-xs"
                            >
                                <HeartPulse size={16} />
                                <span>Browse Home Remedies for Relief</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
