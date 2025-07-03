import { apiClient } from "@kgan/zero-api";

const req = apiClient()
  .config({
    tokenStorage: "localStorage", // or "cookie", "sessionStorage"
    tokenKey: "auth", // Key used to fetch the token object
    tokenPath: "auth.token", // Dot-path to extract token from the object
  })
  .url([
    {
      key: "local1",
      type: "local",
      client: "http://localhost:5173",
      server: "http://localhost:5000/api",
    },
    {
      key: "dev1",
      type: "development",
      client: "https://dev.example.com",
      server: "https://ftcc-api-d102dba193ad.herokuapp.com/api",
    },
    {
      key: "test1",
      type: "test",
      client: "https://test.example.com",
      server: "https://ftcc-api-d102dba193ad.herokuapp.com/api",
    },
    {
      key: "prod1",
      type: "production",
      client: "https://example.com",
      server: "https://ftcc-api-d102dba193ad.herokuapp.com/api",
    },
  ]);

export const api = req.api();
