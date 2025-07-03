import { api } from "./api.client";

export const personService = {
  getAll: (params?: Record<string, any>) => api.getAll("/person", params ?? {}),
  get: (id: string) => api.get(`/person/${id}`),
  update: (id: string, data: any) => api.patch(`/person`, data),
  create: (data: any) => api.post("/person", data),
};
