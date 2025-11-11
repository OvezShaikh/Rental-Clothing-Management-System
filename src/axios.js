// src/axios.js
import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL;

// 👇 Automatically fix mixed content in production (Vercel)
if (
  window.location.hostname.includes("vercel.app") ||
  window.location.hostname.includes("paridhra.in")
) {
  baseURL = ""; // Use Vercel rewrite proxy to avoid HTTPS → HTTP blocking
}

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
