import axios from "axios";
import serverConfig from "./config";

let cancel = null;
// axios取消请求对象
const CancelToken = axios.CancelToken;

const serverAxios = axios.create({
  // baseURL: serverConfig.baseURL, //基础请求地址
  timeout: 10000, // 请求超时设置
});

serverAxios.interceptors.request.use(
  (config) => {
    // 如果上一个请求还未结束则取消请求
    // if (typeof cancel === "function") {
    //   cancel("取消请求");
    // }
    config.cancelToken = new CancelToken((c) => {
      cancel = c;
    });

    // 请求头携带 token 的情况
    if (config.useTokenAuthorization) {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      config.headers["satoken"] = token;
    }

    // 设置请求头
    if (!config.headers["content-type"]) {
      // 如果没有设置请求头
      if (config.method === "post") {
        config.headers["content-type"] = "application/json;charset=utf-8"; // 默认类型
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

serverAxios.interceptors.response.use(
  (res) => {
    // 请求结束则将取消请求的对象内容清空
    cancel = null;
    return res.data;
  },
  (error) => {
    console.log(error);
    // 当是取消请求的错误时中断promise链，使错误不向下传递(本身取消请求不算报错)
    if (axios.isCancel(error)) {
      return new Promise(() => {});
    } else {
      cancel = null;
      return Promise.reject(error);
    }
  }
);

export default serverAxios;
