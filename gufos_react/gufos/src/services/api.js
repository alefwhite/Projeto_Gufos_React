import Axios from "axios";

const api = Axios.create({
    baseURL : "http://localhost:5000/api",
    headers : {
        "Content-type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("usuario-gufos")
    }
});

export default api;