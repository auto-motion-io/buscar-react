import axios from "axios"

const api = axios.create({
    baseURL: "https://6653a8801c6af63f46754654.mockapi.io/oficinas"
});

export default api;