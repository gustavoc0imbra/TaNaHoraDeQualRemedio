import AsyncStorage from "@react-native-async-storage/async-storage";
import { authHttp, medicinesHttp } from "./api";

class AuthService {
    
    public static async login(): Promise<true | false> {
        try {
            const response = await authHttp.post("/medicines");

            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private async save(token: string): Promise<void> {
        await AsyncStorage.setItem("token", token);
    }
}