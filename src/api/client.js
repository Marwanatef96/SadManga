/** @format */

import axios from "axios";

// Central Axios instance configured to hit MangaDex via local CORS Anywhere proxy.
// Make sure proxy.js is running on https://myapp-production-6903.up.railway.app/api https://api.mangadex.org/ https://myapp-production-6903.up.railway.app/api
const apiClient = axios.create({
    baseURL: "https://myapp-production-6903.up.railway.app/api", // points to your backend
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor: pass-through success, normalize errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.errors?.[0]?.detail || error.message;
        return Promise.reject(new Error(message));
    }
);

export default apiClient;
