<script setup></script>

<template>
  <router-view></router-view>
  <!-- <footer>@vite-iptv-app</footer> -->
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
