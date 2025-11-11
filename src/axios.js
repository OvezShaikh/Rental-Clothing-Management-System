import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASE_URL;

// On Vercel or your custom domain, use relative URLs
if (
  window.location.hostname.includes("vercel.app") ||
  window.location.hostname.includes("paridhra.in")
) {
  baseURL = ""; // leave empty to use same-origin `/api/...`
}

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
