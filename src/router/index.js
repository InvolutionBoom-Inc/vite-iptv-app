import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("../pages/Home/index.vue");
const TvPlay = () => import("../pages/TvPlay.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/TvPlayPage", name: "TvPlayPage", component: TvPlay },
];

const router = createRouter({ history: createWebHashHistory(), routes });
export default router;
