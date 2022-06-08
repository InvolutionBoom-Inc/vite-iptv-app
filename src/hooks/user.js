import store from "../store/index.js";
import { message } from "ant-design-vue";
// 收藏频道
const toCollect = (channel) => {
  if (
    store.state.collectionChannel.find((item) => item.name === channel.name)
  ) {
    message.info(channel.name + " have been collected", 0.5);
    return;
  }

  store.commit("addCollection", channel);
  message.success(channel.name + " was successfully collected", 0.5);
};

// 取消收藏频道
const toUnCollect = (channel) => {
  if (
    store.state.collectionChannel.find((item) => item.name === channel.name)
  ) {
    store.commit(
      "deleteCollection",
      store.state.collectionChannel.findIndex(
        (item) => item.name === channel.name
      )
    );

    message.warning(channel.name + "has been cancelled.", 0.5);
    return;
  }
};

export { toCollect, toUnCollect };
