const BASE_URL = import.meta.env.VITE_API_URL || "https://cmdvoyager-api.vercel.app/api";
const API_KEY = import.meta.env.VITE_API_KEY || "cmdvoyager-secret-key";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    ...options,
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return null;

  return res.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patch: (path, body) =>
    request(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};
