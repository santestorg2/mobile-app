import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

const API_BASE = "https://api.company.com/v2";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

client.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  client.post("/auth/login", { email, password });

export const getProfile = () => client.get("/users/me");
export const getTransactions = () => client.get("/transactions");

export default client;
