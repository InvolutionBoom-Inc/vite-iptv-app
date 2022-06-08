import router from "../router/index.js";

// 回到主页
const back = () => {
  router.back(-1);
};

export { back };
