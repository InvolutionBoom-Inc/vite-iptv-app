import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import "ant-design-vue/dist/antd.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
});

createApp(App).use(store).use(router).mount("#app");
