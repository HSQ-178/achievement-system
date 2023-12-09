import axios from "axios";
import { useUserStore } from "../store/userStore";

const instance = axios.create({
    baseURL: "http://localhost:8088",
    timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
      const userStore = useUserStore();
      const token = userStore.users.token;
  
      if (token != null && token != "") {
        config.headers.token = token;
      }
  
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  
  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance