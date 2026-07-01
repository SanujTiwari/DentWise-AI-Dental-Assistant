const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return "/api";
  
  // Remove trailing slashes
  let normalized = envUrl.replace(/\/+$/, "");
  
  // If it doesn't end with /api, append it
  if (!normalized.endsWith("/api")) {
    normalized = `${normalized}/api`;
  }
  
  return normalized;
};

const API_BASE = getApiBase();

async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 401) {
    // Token expired or invalid — clear and redirect
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

// Auth
export const authAPI = {
  register: (data) => apiFetch("/auth/register", { method: "POST", body: data }),
  login: (data) => apiFetch("/auth/login", { method: "POST", body: data }),
  me: () => apiFetch("/auth/me"),
};

// Users
export const usersAPI = {
  getProfile: () => apiFetch("/users/profile"),
  updateBio: (bio) => apiFetch("/users/bio", { method: "PUT", body: { bio } }),
  updateTheme: (chatTheme) => apiFetch("/users/theme", { method: "PUT", body: { chatTheme } }),
  getById: (id) => apiFetch(`/users/${id}`),
};

// Doctors
export const doctorsAPI = {
  getAll: () => apiFetch("/doctors"),
  getAvailable: () => apiFetch("/doctors/available"),
  create: (data) => apiFetch("/doctors", { method: "POST", body: data }),
  update: (id, data) => apiFetch(`/doctors/${id}`, { method: "PUT", body: data }),
};

// Appointments
export const appointmentsAPI = {
  getAll: () => apiFetch("/appointments"),
  getUserAppointments: () => apiFetch("/appointments/user"),
  getStats: () => apiFetch("/appointments/stats"),
  getBookedSlots: (doctorId, date) =>
    apiFetch(`/appointments/booked-slots?doctorId=${doctorId}&date=${date}`),
  book: (data) => apiFetch("/appointments", { method: "POST", body: data }),
  updateStatus: (id, status) =>
    apiFetch(`/appointments/${id}/status`, { method: "PUT", body: { status } }),
};

// Chat
export const chatAPI = {
  send: (messages) => apiFetch("/chat", { method: "POST", body: { messages } }),
};

// Email
export const emailAPI = {
  sendConfirmation: (data) =>
    apiFetch("/email/appointment-confirmation", { method: "POST", body: data }),
};

export default apiFetch;
