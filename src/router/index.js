import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("../pages/Home/index.vue");
const TvPlay = () => import("../pages/TvPlay.vue");
const Subscribe = () => import("../pages/Subscribe/index.vue");
const Collection = () => import("../pages/Collection.vue");

const routes = [
  { path: "/Home", name: "Home", component: Home },
  { path: "/TvPlayPage", name: "TvPlayPage", component: TvPlay },
  { path: "/Subscribe", name: "Subscribe", component: Subscribe },
  { path: "/Collection", name: "Collection", component: Collection },
  {
    path: "/:pathMatch(.*)",
    redirect: "/Subscribe",
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
