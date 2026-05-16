import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  full_name: string;
};

export const api = axios.create({
  baseURL: API_URL,
});

export const authService = {
  async register(userData: RegisterPayload) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
};
