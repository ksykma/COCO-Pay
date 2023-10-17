import axios, { Axios } from "axios";

// const APP_SERVER_URL = "http://localhost:3000";
const APP_SERVER_URL = "https://j9b208.p.ssafy.io";

const instance: Axios = axios.create({
  baseURL: `${APP_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    const userId = userIdFromLocalStorage
      ? parseInt(userIdFromLocalStorage, 10)
      : 4;
    config.headers.userId = userId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
