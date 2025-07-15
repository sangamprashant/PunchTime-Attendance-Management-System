import CryptoJS from "crypto-js";
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ENV } from "../keys";
import { apiRequest, errorMessage } from "../utilities";

const SECRET_KEY = ENV.secretKey;

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    login: (userData: Partial<IUser>) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Encrypt function
const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
const decryptData = (ciphertext: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
};

type LogInData = {
    token: string;
    user: Partial<IUser>
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate()

    useLayoutEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            const decryptedUser = decryptData(savedUser);
            const decryptedToken = decryptData(savedToken);
            if (
                decryptedUser &&
                typeof decryptedUser === "object" &&
                decryptedUser.email
            ) {
                setUser(decryptedUser);
                setToken(decryptedToken);
            } else {
                toast.warning("Invalid or tampered authentication data. Logging out..")
                logout();
            }
        }
    }, []);

    const login = async (userData: Partial<IUser>) => {
        try {
            const res: LogInData = await apiRequest("/users/login", {
                method: "POST", body: { ...userData }
            })
            const encryptedUser = encryptData(res.user);
            const encryptedToken = encryptData(res.token);
            console.log(res)
            setUser(res.user as IUser);
            setToken(res.token);
            localStorage.setItem("user", encryptedUser);
            localStorage.setItem("token", encryptedToken);
            navigate("/")
        } catch (error) {
            toast.error(errorMessage(error))
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.history.replaceState(null, "", "/");
        navigate("/")
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
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
