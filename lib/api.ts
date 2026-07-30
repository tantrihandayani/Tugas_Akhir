import { getToken } from "./auth/auth";

// const BASE_URL = "https://web-production-71d3b8.up.railway.app/api/";
const BASE_URL = "https://web-production-71d3b8.up.railway.app/api/";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...(options.headers || {}),
  };

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  return response;
}