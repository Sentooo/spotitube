import axios from "axios";

const cassette_api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api",
});

export default cassette_api;
