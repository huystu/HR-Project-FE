import axios from "axios";

const api = axios.create({
  baseURL: "https://f05c-113-160-225-96.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
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
