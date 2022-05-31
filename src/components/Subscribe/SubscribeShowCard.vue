<template>
  <div
    v-for="(item, index) in channelURL"
    :key="channelURL"
    class="showURL"
    v-on:click.self="toHome(item.url)"
  >
    <a v-on:click.self="toHome(item.url)">
      源{{ index + 1 }} :{{
        item ? item.url.split("/")[item.url.split("/").length - 1] : ""
      }}</a
    >

    <a-tooltip :title="item.status === true ? 'url ok' : 'url do not use'">
      <div
        class="url-status"
        :class="item.status === true ? 'success' : 'error'"
      ></div>
    </a-tooltip>

    <a-button size="large" @click="deleteURL(item)">
      <template #icon><DeleteOutlined /> </template>
    </a-button>
  </div>
</template>

<script setup>
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();

const store = useStore();

const props = defineProps({
  channelURL: Array,
});

const toHome = (url) => {
  router.push({
    name: "Home",
    params: { url: url },
  });

  store.commit("updateCurrentURL", url);
};

const deleteURL = (url) => {
  store.commit("deleteURL", url);
};
</script>

<style lang="scss">
.showURL {
  width: 100%;
  min-height: 50px;
  line-height: 50px;
  margin-top: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;

  a {
    display: block;
    margin-right: 10px;
    min-width: 150px;
    text-align: left;
  }

  .url-status {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: relative;
    left: -10px;
    top: 18px;
  }
  .success {
    background: rgb(66, 133, 244);
  }
  .error {
    background: red;
  }
  .not-test {
    background: rgb(128, 124, 124);
  }

  .ant-btn {
    align-self: center;
  }

  &:hover {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
      0 5px 12px 4px rgb(0 0 0 / 9%);
  }
}
</style>
