import AsyncStorage from "@react-native-async-storage/async-storage";
import { authHttp, medicinesHttp } from "./api";
import User from "../models/User";

class AuthService {
    
    public static async login(user: User): Promise<string | false> {
        try {
            const response = await authHttp.post("/login", user);
            
            return response.data.token;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default AuthService;