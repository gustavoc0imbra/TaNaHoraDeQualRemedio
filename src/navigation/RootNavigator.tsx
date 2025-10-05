import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
    const { token, isLoading } = useContext(AuthContext);
    
    return (
        <NavigationContainer>
            {token ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}