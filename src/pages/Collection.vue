<template>
  <!-- 页头 -->
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="your collection"
    @back="back"
  />

  <main>
    <ChannelList
      :iptvListAll="collectionChannel"
      modelName="collection"
    ></ChannelList>
    <ChannelCard :iptvListAll="collectionChannel"></ChannelCard>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { back } from "../hooks/utils.js";

const store = useStore();
const router = useRouter();

const collectionChannel = computed(() =>
  store.state.collectionChannel ? store.state.collectionChannel : null
);

console.log(store.state.collectionChannel);
</script>

<style></style>
