<template>
  <div id="app-home">
    <Header :iptvListAll="iptvListAll"></Header>
    <!-- 展示卡片 -->
    <main>
      <ChannelList :iptvListAll="iptvListAll" modelName="main"></ChannelList>
      <ChannelCard :iptvListAll="iptvListAll"></ChannelCard>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Header from "./Header.vue";

const store = useStore();
const iptvListAll = computed(() =>
  store.state.inptList ? store.state.inptList : null
);
watch(iptvListAll.value, (item) => {
  console.log(item);
});
const route = useRoute();

onMounted(() => {
  store.dispatch("setIPTVlist", store.state.currentURL);

  console.log(store.state.inptList);
});
</script>

<style lang="scss"></style>
