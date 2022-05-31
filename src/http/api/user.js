import serverAxios from "../index";

const getTvList = (url) => {
  return serverAxios({
    url: url,
    method: "get",
  });
};

const testURL = (url) => {
  return serverAxios({
    url: url,
    method: "get",
  });
};

export { getTvList, testURL };
