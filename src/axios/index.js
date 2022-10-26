import axios from "axios";
import store from "../store";

const httpClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("AUTH_TOKEN");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  store.commit("changeLoadingState");
  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    store.commit("changeLoadingState");
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      !originalRequest._retry &&
      error.response.data.refresh
    ) {
      originalRequest._retry = true;
      const token = await httpClient.post("/refresh");
      localStorage.setItem("AUTH_TOKEN", token.data.data.token);
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "AUTH_TOKEN"
      )}`;
      store.commit("changeLoadingState");
      return httpClient(originalRequest);
    }
    store.commit("changeLoadingState");
    return Promise.reject(error);
  }
);

export default httpClient;
