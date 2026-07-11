import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const data = await login(credentials);
            setUser(data); 
            return true;
        } catch (err) {
            console.error("Login error:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (userData) => {
        setLoading(true);
        try {
            await register(userData);
            return true;
        } catch (err) {
            console.error("Register error:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            return true;
        } catch (err) {
            console.error("Logout error:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const checkUserAuth = async () => {
        try {
            const data = await getMe();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleRegister, handleLogin, handleLogout, checkUserAuth };
};