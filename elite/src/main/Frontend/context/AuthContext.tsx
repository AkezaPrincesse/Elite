// context/auth-context.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, getUserProfile } from '@/services/auth-service';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const signIn = async (credentials: { username: string; password: string }) => {
        const response = await login(credentials);
        if (response.ok) {
            const userData = await getUserProfile();
            setUser(userData);
        }
        return response;
    };

    const signOut = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}