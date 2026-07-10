import { createContext,useState,useEffect } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Initial check: App load hote hi user ko check karo
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getMe();
                if (data) setUser(data);
            } catch (err) {
                console.error("Auth check failed:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []); // Empty array ka matlab hai sirf ek baar run hoga

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}} >
            {children}
        </AuthContext.Provider>
    )
}