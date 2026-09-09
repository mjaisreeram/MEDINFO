import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Edit, Trash, Users, FileText, Activity, X, Check, RefreshCw } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('antibiotics');
    const [antibiotics, setAntibiotics] = useState([]);
    const [remedies, setRemedies] = useState([]);
    const [stats, setStats] = useState({ totalAntibiotics: 0, totalRemedies: 0, activeUsers: 0 });
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null = Add mode, object = Edit mode

    // Form state
    const [antForm, setAntForm] = useState({
        name: '',
        class: '',
        usage: '',
        resistance_level: 'Medium',
        resistance_detail: '',
        warning: '',
        alternatives: ''
    });

    const [remForm, setRemForm] = useState({
        ailment: '',
        remedyName: '',
        remedyDescription: '',
        remedyIngredients: '',
        remedyDuration: '',
        warning: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [antRes, remRes, statsRes] = await Promise.allSettled([
                axios.get('http://localhost:5000/antibiotics'),
                axios.get('http://localhost:5000/remedies'),
                axios.get('http://localhost:5000/stats')
            ]);

            if (antRes.status === 'fulfilled') {
                setAntibiotics(antRes.value.data);
            }
            if (remRes.status === 'fulfilled') {
                setRemedies(remRes.value.data);
            }
            if (statsRes.status === 'fulfilled') {
                setStats(statsRes.value.data);
            }
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user]);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    const openAddModal = () => {
        setEditingItem(null);
        setAntForm({
            name: '',
            class: '',
            usage: '',
            resistance_level: 'Medium',
            resistance_detail: '',
            warning: '',
            alternatives: ''
        });
        setRemForm({
            ailment: '',
            remedyName: '',
            remedyDescription: '',
            remedyIngredients: '',
            remedyDuration: '',
            warning: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        if (activeTab === 'antibiotics') {
            setAntForm({
                name: item.name || '',
                class: item.class || '',
                usage: item.usage || '',
                resistance_level: item.resistance_level || 'Medium',
                resistance_detail: item.resistance_detail || '',
                warning: item.warning || '',
                alternatives: item.alternatives || ''
            });
        } else {
            const primaryRemedy = item.remedies && item.remedies[0] ? item.remedies[0] : {};
            setRemForm({
                ailment: item.ailment || '',
                remedyName: primaryRemedy.name || '',
                remedyDescription: primaryRemedy.description || '',
                remedyIngredients: Array.isArray(primaryRemedy.ingredients) ? primaryRemedy.ingredients.join(', ') : (primaryRemedy.ingredients || ''),
                remedyDuration: primaryRemedy.duration || '',
                warning: item.warning || ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        try {
            const endpoint = activeTab === 'antibiotics'
                ? `http://localhost:5000/antibiotics/${id}`
                : `http://localhost:5000/remedies/${id}`;
            await axios.delete(endpoint);
            fetchData();
        } catch (err) {
            alert('Failed to delete item from backend.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'antibiotics') {
                if (editingItem && editingItem._id) {
                    await axios.put(`http://localhost:5000/antibiotics/${editingItem._id}`, antForm);
                } else {
                    await axios.post('http://localhost:5000/antibiotics', antForm);
                }
            } else {
                const remedyPayload = {
                    ailment: remForm.ailment,
                    remedies: [
                        {
                            name: remForm.remedyName,
                            description: remForm.remedyDescription,
                            ingredients: remForm.remedyIngredients.split(',').map(s => s.trim()).filter(Boolean),
                            duration: remForm.remedyDuration
                        }
                    ],
                    warning: remForm.warning
                };

                if (editingItem && editingItem._id) {
                    await axios.put(`http://localhost:5000/remedies/${editingItem._id}`, remedyPayload);
                } else {
                    await axios.post('http://localhost:5000/remedies', remedyPayload);
                }
            }

            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Failed to save data to backend.');
        }
    };

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-4 rounded-2xl ${color} text-white`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-trust-blue">Admin Dashboard</h1>
                    <p className="text-slate-500">Manage live database content and system stats</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={fetchData} 
                        className="p-3 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition-colors shadow-sm"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={openAddModal}
                        className="flex items-center space-x-2 bg-trust-blue hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20"
                    >
                        <Plus size={20} />
                        <span>Add New Entry</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Antibiotics"
                    value={stats.totalAntibiotics || antibiotics.length}
                    icon={Activity}
                    color="bg-sky-500"
                />
                <StatCard
                    title="Home Remedies"
                    value={stats.totalRemedies || remedies.length}
                    icon={FileText}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Active Users"
                    value={stats.activeUsers || 1}
                    icon={Users}
                    color="bg-orange-500"
                />
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => setActiveTab('antibiotics')}
                        className={`px-8 py-4 font-bold text-sm transition-colors ${activeTab === 'antibiotics' ? 'bg-slate-50 text-trust-blue border-b-2 border-trust-blue' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Antibiotics Database ({antibiotics.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('remedies')}
                        className={`px-8 py-4 font-bold text-sm transition-colors ${activeTab === 'remedies' ? 'bg-slate-50 text-trust-blue border-b-2 border-trust-blue' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Home Remedies ({remedies.length})
                    </button>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                                    <th className="py-4 pl-4">Name / Ailment</th>
                                    <th className="py-4">Category / Details</th>
                                    <th className="py-4">Status / Risk</th>
                                    <th className="py-4 text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {activeTab === 'antibiotics' ? (
                                    antibiotics.map((item) => (
                                        <tr key={item._id || item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 pl-4 font-semibold text-slate-700">{item.name}</td>
                                            <td className="py-4 text-slate-500">{item.class}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${item.resistance_level === 'High' || item.resistance_level === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {item.resistance_level || 'Medium'}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right pr-4">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => openEditModal(item)} className="p-2 hover:bg-sky-50 text-slate-400 hover:text-sky-500 rounded-lg transition-colors">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id || item.id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    remedies.map((item) => (
                                        <tr key={item._id || item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 pl-4 font-semibold text-slate-700">{item.ailment}</td>
                                            <td className="py-4 text-slate-500">{(item.remedies || []).length} Remedies</td>
                                            <td className="py-4">
                                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-500">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="py-4 text-right pr-4">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => openEditModal(item)} className="p-2 hover:bg-sky-50 text-slate-400 hover:text-sky-500 rounded-lg transition-colors">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id || item.id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Interactive Add / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100 space-y-4 animate-scale-in">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingItem ? `Edit ${activeTab === 'antibiotics' ? 'Antibiotic' : 'Remedy'}` : `Add New ${activeTab === 'antibiotics' ? 'Antibiotic' : 'Remedy'}`}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            {activeTab === 'antibiotics' ? (
                                <>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Medicine Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={antForm.name}
                                            onChange={(e) => setAntForm({ ...antForm, name: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Amoxicillin"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Drug Class</label>
                                            <input
                                                type="text"
                                                required
                                                value={antForm.class}
                                                onChange={(e) => setAntForm({ ...antForm, class: e.target.value })}
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                                placeholder="e.g. Penicillin"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Resistance Risk</label>
                                            <select
                                                value={antForm.resistance_level}
                                                onChange={(e) => setAntForm({ ...antForm, resistance_level: e.target.value })}
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                                            >
                                                <option value="Safe">Safe</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Rising">Rising</option>
                                                <option value="High">High</option>
                                                <option value="Critical">Critical</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Primary Usage</label>
                                        <input
                                            type="text"
                                            required
                                            value={antForm.usage}
                                            onChange={(e) => setAntForm({ ...antForm, usage: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Respiratory infections, UTI"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Resistance & Insight Details</label>
                                        <textarea
                                            value={antForm.resistance_detail}
                                            onChange={(e) => setAntForm({ ...antForm, resistance_detail: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl h-16"
                                            placeholder="Details regarding clinical resistance trends..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Safety Warnings</label>
                                        <input
                                            type="text"
                                            value={antForm.warning}
                                            onChange={(e) => setAntForm({ ...antForm, warning: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Complete full course as prescribed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Safe Alternatives</label>
                                        <input
                                            type="text"
                                            value={antForm.alternatives}
                                            onChange={(e) => setAntForm({ ...antForm, alternatives: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Warm tea, fluids, home care"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Ailment Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={remForm.ailment}
                                            onChange={(e) => setRemForm({ ...remForm, ailment: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Sore Throat"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Remedy Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={remForm.remedyName}
                                            onChange={(e) => setRemForm({ ...remForm, remedyName: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Warm Salt Water Gargle"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Remedy Description</label>
                                        <textarea
                                            required
                                            value={remForm.remedyDescription}
                                            onChange={(e) => setRemForm({ ...remForm, remedyDescription: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl h-16"
                                            placeholder="Brief description of how to prepare or use..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Ingredients (comma separated)</label>
                                            <input
                                                type="text"
                                                value={remForm.remedyIngredients}
                                                onChange={(e) => setRemForm({ ...remForm, remedyIngredients: e.target.value })}
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                                placeholder="Warm Water, Salt"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold text-slate-700 mb-1">Duration / Frequency</label>
                                            <input
                                                type="text"
                                                value={remForm.remedyDuration}
                                                onChange={(e) => setRemForm({ ...remForm, remedyDuration: e.target.value })}
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                                placeholder="Every 4 hours"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-slate-700 mb-1">Medical Warning</label>
                                        <input
                                            type="text"
                                            value={remForm.warning}
                                            onChange={(e) => setRemForm({ ...remForm, warning: e.target.value })}
                                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                                            placeholder="e.g. Seek emergency care if breathing is hindered"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-trust-blue hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1"
                                >
                                    <Check size={16} />
                                    <span>Save Entry</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
