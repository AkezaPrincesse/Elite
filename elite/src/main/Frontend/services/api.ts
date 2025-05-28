import { toast } from "@/components/ui/use-toast";
const API_BASE_URL = 'http://localhost:8095/api';
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8095"

export const checkUsernameAvailability = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/check-username/${username}`);
    return await response.json();
};

export const register = async (userData: {
    username: string
    email: string
    password: string
    role: string
}) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Registration failed")
        }

        return await response.json()
    } catch (error: any) {
        toast({
            title: "Registration error",
            description: error.message,
            variant: "destructive",
        })
        throw error
    }
}

export const login = async (data: { username: string; password: string }) => {
    const response = await fetch("http://localhost:8095/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
            username: data.username,
            password: data.password,
        }).toString(),
    });

    return response;
};

export const logout = async () => {
    const response = await fetch("http://localhost:8095/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};

export const getUserProfile = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/${username}`, {
        credentials: 'include',
    });
    return await response.json();
};

export const updateUserProfile = async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/users/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
    });
    return await response.json();
};
