export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const saveRefreshToken = (token: string) => {
    localStorage.setItem("refresh", token);
};

export const saveRole = (role: string) => {
    localStorage.setItem("role", role);
};

export const saveUser = (user: {
    username: string;
    role: string;
}) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refresh");
};

export const getRole = () => {
    return localStorage.getItem("role");
};

export const getUser = (): {
    username: string;
    role: string;
} | null => {
    if (typeof window === "undefined") {
        return null;
    }
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
};