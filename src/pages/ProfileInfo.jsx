import React, { useState } from 'react';
import { User, Mail, Phone, Heart, Save, CheckCircle2 } from 'lucide-react';

const ProfileInfo = () => {
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 234-5678',
        age: '29',
        gender: 'Male',
        bloodGroup: 'O+',
        allergies: 'Penicillin, Dust Mites',
        emergencyContact: 'Sarah Johnson (+1 555-987-6543)',
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl font-bold text-slate-900">Profile Info</h1>
                <p className="text-xs text-slate-500 mt-1">Manage your personal and health information</p>
            </div>

            {saved && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Profile information updated successfully.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Avatar Preview */}
                <div className="flex items-center space-x-4 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                        {profile.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-sm">{profile.name}</h3>
                        <p className="text-xs text-slate-500">{profile.email}</p>
                        <span className="inline-block text-[10px] font-bold text-orange-600 uppercase tracking-wider mt-1 bg-orange-100 px-2 py-0.5 rounded-full">
                            Patient ID: #MED-8492
                        </span>
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Details</p>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                            <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                                <Mail size={14} className="absolute left-3 top-3.5 text-slate-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                                <Phone size={14} className="absolute left-3 top-3.5 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={profile.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={profile.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                            <input
                                type="text"
                                name="bloodGroup"
                                value={profile.bloodGroup}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-orange-600 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Health & Medical Section */}
                <div className="space-y-4 pt-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medical Information</p>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Known Allergies</label>
                        <input
                            type="text"
                            name="allergies"
                            value={profile.allergies}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="emergencyContact"
                                value={profile.emergencyContact}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                            />
                            <Heart size={16} className="absolute left-3.5 top-3 text-red-500" />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full btn-orange">
                        <Save size={16} />
                        <span>Save Profile Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfo;
