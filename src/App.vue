<script setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

watch(route, (to) => {
  if (to.name === "Home" && store.state.currentURL === "") {
    router.push("/Subscribe");
  }
});

onMounted(() => {
  store.commit("initStore", JSON.parse(localStorage.getItem("videoInfo")));
});

window.onbeforeunload = () => {
  store.commit("clearIPTVList");

  store.commit("deleteSearchResultInfo");

  localStorage.setItem("videoInfo", JSON.stringify(store.state));
};

// 配置message
message.config({
  duration: 2,
  maxCount: 1,
  rtl: true,
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  footer {
    margin-top: 50px;
    min-height: 80px;
    width: 100%;
    background-color: #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: white;
    font-family: "等线";
  }
}
</style>
