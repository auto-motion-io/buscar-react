import axios from "axios"

const api = axios.create({
    baseURL: "https://pitstop-api.azurewebsites.net"
});

export default api;