import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                M
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
                Medinfo
            </span>
        </div>
    );
};

export default Logo;
