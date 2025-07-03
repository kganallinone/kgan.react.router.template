import { api } from "./api.client";

export const metricsService = {
  search: (params?: Record<string, any>) => api.post("/metrics", params ?? {}),
};
