import axios from "axios";

export default axios.create({
  baseURL: "https://api.dukkho.alvereduan.com",
  timeout: 1200000,
  withCredentials: true,
});