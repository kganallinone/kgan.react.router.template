import { api } from "./api.client";

export const pkrfService = {
  getAll: (params?: Record<string, any>) => api.getAll("/pkrf", params ?? {}),
  get: (id: string) => api.get(`/pkrf/${id}`),
  update: (id: string, data: any) => api.put(`/pkrf`, data),
  create: (data: any) => api.post("/pkrf", data),
  exportPKRF: (id: string) => api.get(`/pkrf/${id}/export`),
  import: (data: any) => api.post("/pkrf/import", data),
};
