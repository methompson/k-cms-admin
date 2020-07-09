import { defaultState as dragDefaultState } from "./drag-section-store";

const getDefaultState = () => {
  return {
    ...dragDefaultState,
    appName: "K-CMS Admin Panel",
    userToken: null,
    decodedUserToken: null,

    messages: [],
  };
};

export {
  getDefaultState,
};
