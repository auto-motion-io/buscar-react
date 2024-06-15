import axios from "axios";
import { toast } from "react-toastify"; // Importe o módulo de toast que você está utilizando

const api1 = axios.create({
    baseURL: "https://pitstop-api.azurewebsites.net"
});

const api2 = axios.create({
    baseURL: "https://buscar-api.azurewebsites.net"
});


// Interceptor para capturar erros de resposta
const responseInterceptor = (api) => {
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 403) {
                // Se receber um 403, exibe um toast e redireciona para a tela de login
                toast.error("Faça login para continuar");
            }
            return Promise.reject(error);
        }
    );
};

// Aplicar o interceptor para ambas as APIs
responseInterceptor(api1);
responseInterceptor(api2);

// Exportar suas APIs configuradas
export { api1, api2 };
