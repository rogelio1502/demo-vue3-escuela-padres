import axios from "axios";
const instance = axios.create({
  baseURL: "https://u8d8rt.deta.dev",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
