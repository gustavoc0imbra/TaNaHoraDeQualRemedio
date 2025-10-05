import { Alert, Button, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../assets/styles/global";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login({ email: email, password: password });
        } catch (error) {
            Alert.alert("Ops", "Ocorreu algo ao fazer login!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={[GlobalStyles.screenContainer]}>
            <TextInput
                placeholder="Digite seu e-mail"
                style={{
                    borderRadius: 10,
                    borderColor: "#000",
                    borderWidth: 1,
                    padding: 12
                }}
                keyboardType="email-address"
                value={email}
            />
            <TextInput
                placeholder="Digite sua senha"
                style={{
                    borderRadius: 10,
                    borderColor: "#000",
                    borderWidth: 1,
                    padding: 12,
                }}
                secureTextEntry
                value={password}
            />
            <Button title={isLoading ? "Aguarde..." : "Entrar"} onPress={handleLogin} disabled={isLoading} />
            <Button color="tomato" title="Cancelar" disabled={isLoading} />
        </View>
    );
}