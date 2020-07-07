import { defaultState as dragDefaultState } from "./drag-section-store";

const getDefaultState = () => {
  return {
    ...dragDefaultState,
    userToken: null,
    decodedUserToken: null,

    messages: [],
  };
};

export {
  getDefaultState,
};
