<template>
  <div id="app-home">
    <Header :iptvListAll="iptvListAll"></Header>
    <!-- 展示卡片 -->
    <main>
      <ChannelList :iptvListAll="iptvListAll"></ChannelList>
      <ChannelCard :iptvListAll="iptvListAll"></ChannelCard>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Header from "./Header.vue";

const store = useStore();
const iptvListAll = computed(() => store.state.inptList.items);

onMounted(() => {
  store.dispatch("setIPTVlist");
});
</script>

<style lang="scss"></style>
