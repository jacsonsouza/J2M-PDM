import axios from "axios";

const api = axios.create({
  baseURL: "https://parallelum.com.br",
});

export default api;
