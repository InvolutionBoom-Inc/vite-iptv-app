<template>
  <!-- 页头 -->
  <a-page-header
    style="
      border: 1px solid rgb(235, 237, 240);
      position: sticky;
      top: -1px;
      background-color: white;
      z-index: 15;
    "
    title="your collection"
    @back="back"
  />

  <main>
    <div v-if="collectionChannel">
      <ChannelList
        :iptvListAll="collectionChannel"
        modelName="collection"
      ></ChannelList>
      <ChannelCard
        :iptvListAll="collectionChannel"
        modelName="collection"
      ></ChannelCard>
    </div>
    <a-empty description="no data" v-else style="margin-top: 50px" />
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
</script>

<style lang="scss"></style>
