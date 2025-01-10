import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  // baseURL: "https://f05c-113-160-225-96.ngrok-free.app",
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': 'true' ,
    Accept: "application/json",
  },
  // withCredentials: true
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
