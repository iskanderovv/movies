import axios from "axios";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

export default axiosBase;
