import axios from "axios";

//dominio base al que siempre va a consultar
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials : true,

})
export default instance;