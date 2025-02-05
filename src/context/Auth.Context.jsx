import { createContext, useContext, useState, useEffect } from "react"; 
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.role) {
                setUserRole(parsedUser.role);
            }
        }
    }, []);

    const login = async (username, password) => {
        const loginData = { username, password };

        try {
            console.log(import.meta.env)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(loginData),
            });

            const userData = await response.json();
            // console.log(userData);

            if (!response.ok) {
                return userData.message;
            }

            setUserRole(userData.data.role);
            localStorage.setItem("userData", JSON.stringify(userData.data));
            return userData;
        } catch (error) {
            return error.message;
        }
    };

    const logout = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/logout`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Logout failed');
            }  
            return data.messages || 'Successfully logged out';
        } catch (error) {
            console.error(error);
            return error.message || 'An error occurred during logout';
        } finally {
            setUserRole(null);
            localStorage.removeItem("userData");
        }
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
