import axios from "axios"

const api1 = axios.create({
    baseURL: "https://pitstop-api.azurewebsites.net"
});

const api2 = axios.create({
    baseURL: "https://buscar-api.azurewebsites.net"
});

export { api1, api2 };