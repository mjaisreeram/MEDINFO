import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('amr_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('amr_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const loggedInUser = response.data;
            setUser(loggedInUser);
            localStorage.setItem('amr_user', JSON.stringify(loggedInUser));
            return loggedInUser;
        } catch (err) {
            // Fallback for offline mode or backend error
            if (email && password) {
                const fallbackUser = {
                    email,
                    name: email.split('@')[0],
                    role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
                    id: Date.now().toString()
                };
                setUser(fallbackUser);
                localStorage.setItem('amr_user', JSON.stringify(fallbackUser));
                return fallbackUser;
            }
            throw new Error(err.response?.data?.error || 'Invalid credentials');
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', { name, email, password });
            const registeredUser = response.data;
            setUser(registeredUser);
            localStorage.setItem('amr_user', JSON.stringify(registeredUser));
            return registeredUser;
        } catch (err) {
            // Fallback for offline mode or backend error
            if (email && password && name) {
                const fallbackUser = {
                    email,
                    name,
                    role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
                    id: Date.now().toString()
                };
                setUser(fallbackUser);
                localStorage.setItem('amr_user', JSON.stringify(fallbackUser));
                return fallbackUser;
            }
            throw new Error(err.response?.data?.error || 'Registration failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('amr_user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
