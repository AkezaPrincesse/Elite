import { toast } from "@/components/ui/use-toast";
const API_BASE_URL = 'http://localhost:8095/api';

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
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

export const login = async (data: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        return await response.json();
    } catch (error: any) {
        toast({
            title: "Login error",
            description: error.message,
            variant: "destructive",
        });
        throw error;
    }
};

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const getUserProfile = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/${username}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return await response.json();
};

export const updateUserProfile = async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/users/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};
