import { createContext, useState, useEffect, useContext } from "react";
import { getMe, login, register } from "./services/auth.api"; // Import functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial check
    useEffect(() => {
        const init = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    
    const handleRegister = async (userData) => {
        return await register(userData);
    };

    const handleLogin = async (credentials) => {
        const data = await login(credentials);
        setUser(data);
        return data;
    };

    return (
        
        <AuthContext.Provider value={{ loading, user, handleRegister, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);