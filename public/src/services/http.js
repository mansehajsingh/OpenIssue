import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});

api.defaults.withCredentials = true;

export default api;