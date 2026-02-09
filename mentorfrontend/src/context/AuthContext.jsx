import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await api.get('/auth/me');
                if (res.data.data.role === 'mentor') {
                    setUser(res.data.data);
                } else {
                    // If logged in as user but trying to access mentor app
                    await api.get('/auth/logout');
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.user.role !== 'mentor') {
                await api.get('/auth/logout');
                return { success: false, error: 'Access denied. Mentor account required.' };
            }
            setUser(res.data.user);
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', { ...userData, role: 'mentor' });
            setUser(res.data.user);
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await api.get('/auth/logout');
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
