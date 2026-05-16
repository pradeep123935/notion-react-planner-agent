import axios from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  full_name: string;
};

export const api = axios.create({
  baseURL: "",
});

export const authService = {
  async register(userData: RegisterPayload) {
    const response = await api.post("/api/register", userData);
    return response.data;
  },
};
