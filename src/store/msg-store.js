import { v4 as uuidv4 } from 'uuid';

import { isObject, isString, isNumber } from "@/shared/is-data";

const mutations = {
  saveMessage(state, payload) {
    if (!isObject(payload)
      || !isObject(payload.message)
      || !isString(payload.message.msg)
      || !isString(payload.message.type)
      || !isString(payload.message.id)
    ) {
      console.log("Invalid Message");
      return;
    }

    const messages = [
      ...state.messages,
    ];
    messages.push(payload.message);

    state.messages = messages;
  },
  deleteMessage(state, payload) {
    if (!isObject(payload)
      || !isNumber(payload.index)
    ) {
      return;
    }

    const messages = [
      ...state.messages,
    ];
    messages.splice(payload.index, 1);

    state.messages = messages;
  },
};

const actions = {
  /**
   * The payload is required to contain a message
   * Otherwise, the payload can contain the following other data:
   * type: can be 'info', 'success' and 'error'. This affects the color of the message
   * timeout: a number, in seconds, representing the duration the message stays up
   *
   * If the above aren't included, a default is passed to the store:
   * info type message
   * 15 seconds for timeout
   * @param {Object} context Vuex Context Object
   * @param {Object} payload Payload object containing data
   */
  addMessage(context, payload) {
    if (!isObject(payload)
      || !isString(payload.msg)
    ) {
      return Promise.reject("Invalid Payload");
    }

    const type = "type" in payload && isString(payload.type)
      ? payload.type
      : "info";

    // Setting the auto close timeout feature
    // default value
    let timeout;

    // set a default error timeout default to 5 minutes;
    if (!isNumber(payload.timeout) && type === "error") {
      timeout = 5 * 60 * 1000;
    } else if (isNumber(payload.timeout)) {
      timeout = payload.timeout * 1000;
    } else {
      timeout = 15000;
    }

    const exp = new Date().getTime() + timeout;

    const id = uuidv4();
    const { msg } = payload;

    context.commit("saveMessage", {
      message: {
        id,
        msg,
        type,
        exp,
      },
    });

    return Promise.resolve();
  },
  removeMessage(context, payload) {
    if (!isObject(payload)
      || !isString(payload.id)
    ) {
      return Promise.reject("Invalid Payload");
    }

    const { messages } = context.state;

    const index = messages.findIndex((el) => {
      return el.id === payload.id;
    });

    context.commit("deleteMessage", {
      index,
    });

    return Promise.resolve();
  },
};

export {
  mutations,
  actions,
};
