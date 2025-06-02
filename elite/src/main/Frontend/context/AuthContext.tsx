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

    const signIn = async (credentials: { email: string; password: string }) => {
        const response = await login(credentials);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            const userData = await getUserProfile();
            setUser(userData);
        }
        return response;
    };

    const signOut = async () => {
        await logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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