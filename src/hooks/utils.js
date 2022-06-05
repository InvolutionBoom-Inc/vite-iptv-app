import router from "../router/index.js";
import store from "../store/index.js";
import { message } from "ant-design-vue";
// 回到主页
const back = () => {
  router.back(-1);
};

export { back };
