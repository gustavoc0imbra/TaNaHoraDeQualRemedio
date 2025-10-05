import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import User from "../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../services/authService";

const TOKEN_ALIAS = "_token";

interface AuthContextType {
    token: string | null;
    isLoading: boolean;
    login: (user: User) => Promise<void | false>;
    logout: () => Promise<void | false>;
};

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    isLoading: true,
    login: async (user: User) => {},
    logout: async () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const hasToken = await AsyncStorage.getItem(TOKEN_ALIAS);
            if (hasToken) setToken(hasToken);
            setIsLoading(false);
        })();
    }, []);

    const login = async (user: User): Promise<void | false> => {
        const token = await AuthService.login(user);

        if(!token) {
            return false;
        }

        setToken(token);
        await AsyncStorage.setItem(TOKEN_ALIAS, token);
    }

    const logout = async (): Promise<void | false> => {
        setToken(null);
        await AsyncStorage.removeItem(TOKEN_ALIAS);
    }

    const value = useMemo(() => ({ token, isLoading, login, logout }), [token, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}