import Medicine from "../models/Medicine";
import { medicinesHttp } from "./api";

class MedicineService {
    
    public static async getAll(): Promise<Medicine[] | false> {
        try {
            const response = await medicinesHttp.get("/medicines");

            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    public static async getById(id: string): Promise<Medicine | false> {
        try {
            const response = await medicinesHttp.get(`/medicines/${id}`);

            return response.data;
        } catch (error) {
            console.error(error);

            return false;
        }
    }
    public static async save(medicine: Medicine): Promise<Medicine | false> {
        try {
            let response;

            if(medicine.id) {
                response = await medicinesHttp.put(`/medicines/${medicine.id}`, medicine);
            }else {
                response = await medicinesHttp.post("/medicines", medicine);
            }

            return response.data;
        } catch (error) {
            console.error(error);

            return false;
        }
    }
    public static async deleteById(id: string): Promise<true | false> {
        try {
            const response = await medicinesHttp.delete(`/medicines/${id}`);

            return response.data;
        } catch (error) {
            console.error(error);

            return false;
        }
    }
}

export default MedicineService;