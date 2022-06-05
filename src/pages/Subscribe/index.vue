<template>
  <div id="app-subscribe">
    <img src="/icons/iptv-profiles.png" />

    <a-input-group compact>
      <a-input
        v-model:value="inputURL"
        size="large"
        placeholder="Download from a URL"
        class="input"
        @keyup.enter="download"
      />

      <a-tooltip title="please copy git url">
        <a-button size="large">
          <template #icon
            ><a href="https://github.com/iptv-org/iptv" target="_blank"
              ><CopyOutlined /></a
          ></template>
        </a-button>
      </a-tooltip>

      <a-button size="large" @click="clear">
        <template #icon><DeleteOutlined /> </template>
      </a-button>

      <a-button
        type="primary"
        size="large"
        class="download"
        style="background: #4285f4"
        @click="download"
        :loading="downloading"
      >
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>

      <a-button
        type="primary"
        size="large"
        class="collection"
        style="background: #4285f4"
        @click="toCollection"
      >
        <template #icon>
          <StarOutlined />
        </template>
      </a-button>
    </a-input-group>

    <div class="show-url-box">
      <SubscribeShowCard :channelURL="channelURL" />
    </div>
  </div>
</template>

<script setup>
import {
  CopyOutlined,
  DownloadOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons-vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { testURL } from "../../http/api/user.js";
import { message } from "ant-design-vue";
import SubscribeShowCard from "../../components/Subscribe/SubscribeShowCard.vue";

const store = useStore();
const router = useRouter();

const inputURL = ref("");

const clear = () => {
  inputURL.value = "";
};

const downloading = ref(false);
const download = async () => {
  if (inputURL.value != "") {
    try {
      downloading.value = true;

      const res = await testURL(inputURL.value);

      if (
        store.state.channelURL.find(
          (element) => element.url === inputURL.value
        ) != void 0
      ) {
        message.info("Channel already exists", 0.5);
      } else {
        store.commit("updateChannelURL", {
          url: inputURL.value,
          state: "true",
        });

        message.success("Add Channel successful", 0.5);
      }
    } catch (error) {
      message.error(error.message, 0.5);
    }

    downloading.value = false;
  }
};

const channelURL = computed(() => {
  if (store.state.channelURL.length > 0) {
    store.state.channelURL.forEach(async (item) => {
      try {
        const res = await testURL(item.url);

        item.status = true;
      } catch (error) {
        item.status = false;
      }
    });
    return store.state.channelURL;
  }
});

const toCollection = () => {
  router.push("/Collection");
};
</script>

<style lang="scss">
#app-subscribe {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  @media screen and (max-width: 768px) {
    img {
      width: 75vw;
    }
    .ant-input-group {
      width: 90vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .download {
        margin-top: 50px;
      }

      .collection {
        margin-top: 50px;
      }
    }
    .input {
      width: calc(100% - 100px);
      text-align: left;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1344px) {
    img {
      width: 75vw;
    }
    .ant-input-group {
      width: 75vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .download {
        margin-top: 50px;
      }
      .collection {
        margin-top: 50px;
      }
    }
    .input {
      width: calc(100% - 100px);
      text-align: left;
    }
  }

  @media screen and (min-width: 1344px) and (max-width: 1980px) {
    img {
      width: 50vw;
    }
    .ant-input-group {
      width: 50vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .download {
        margin-top: 50px;
      }
      .collection {
        margin-top: 50px;
      }
    }
    .input {
      width: calc(100% - 200px);
      text-align: left;
    }
  }

  @media screen and (min-width: 1980px) {
    img {
      width: 35vw;
    }
    .ant-input-group {
      width: 35vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .download {
        margin-top: 50px;
      }
      .collection {
        margin-top: 50px;
      }
    }
    .input {
      width: calc(100% - 200px);
      text-align: left;
    }
  }

  .show-url-box {
    min-height: 200px;
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
