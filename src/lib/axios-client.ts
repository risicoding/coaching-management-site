import axios from "axios";
import superjson from "superjson";

const api = axios.create({
  baseURL: "/api", // change this as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request serializer
api.interceptors.request.use((config) => {
  if (config.data) {
    const serialized = superjson.stringify(config.data);
    config.data = serialized;
  }
  return config;
});

// Response deserializer
api.interceptors.response.use((response) => {
  if (typeof response.data === "string") {
    try {
      const deserialized = superjson.parse(response.data);
      response.data = deserialized;
    } catch {
      // Not a superjson string, leave as-is
    }
  }
  return response;
});

export default api;
