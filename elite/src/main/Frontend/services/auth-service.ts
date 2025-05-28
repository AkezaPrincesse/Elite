// services/auth-service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8095";

export const login = async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });
    return response;
};

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response;
};

export const getUserProfile = async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });
    return response.json();
};