import api from "./axios";

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}) {
  const res = await api.post("/api/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/api/login", data);
  return res.data;
}

export async function logout() {
  const res = await api.post("/api/logout");
  return res.data;
}

export async function getProfile() {
  const res = await api.get("/api/profile");
  return res.data;
}

export async function updateProfile(data: {
  name?: string;
  phone?: string;
  address?: string;
}) {
  const res = await api.put("/api/profile", data);
  return res.data;
}
