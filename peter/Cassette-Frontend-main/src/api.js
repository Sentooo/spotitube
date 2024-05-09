import axios from "axios";

const cassette_api = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8000/api",
});

export default cassette_api;
