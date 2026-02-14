const API_URL = "http://34.155.205.146:3000/api";

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
