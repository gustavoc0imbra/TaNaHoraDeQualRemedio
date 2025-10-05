import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
    const { token, isLoading } = useContext(AuthContext);
    
    return (
        <NavigationContainer>
            {token ? <></> : <AuthNavigator />}
        </NavigationContainer>
    );
}