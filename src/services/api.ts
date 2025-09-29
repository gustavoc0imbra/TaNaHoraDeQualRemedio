import axios from "axios";

const MOCKAPI:string = "https://68d7ee2e2144ea3f6da6de6e.mockapi.io/api/v1/medicines";
const AUTHAPI:string = "https://reqres.in/api";

export const medicinesHttp = axios.create({
    baseURL: MOCKAPI,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const authHttp = axios.create({
    baseURL: AUTHAPI,
    headers: {
        "Accept": "application/json",
        "x-api-key": "reqres-free-v1",
        "Content-Type": "application/json"
    }
})