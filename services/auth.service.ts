import { api } from "./api.client";

export const authService = {
  login: (data: any) => api.post("/auth/login", data),
};
