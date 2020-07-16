import * as jwt from 'jsonwebtoken';

import { isTokenValid } from "@/shared/auth-utils";
import { isString, isObject } from "../shared/is-data";

const mutations = {
  saveLoginData(state, data) {
    if (!isString(data.userToken)) {
      return;
    }

    state.userToken = data.userToken;
    state.decodedUserToken = data.decodedUserToken;
  },

  purgeLoginData(state) {
    state.userToken = null;
  },
};

const actions = {
  initFromLocalStorage(context) {
    const authToken = localStorage.getItem("kcmsAuthToken");

    if (!authToken) {
      return false;
    }

    const decodedToken = jwt.decode(authToken);

    if (!isTokenValid(decodedToken)) {
      return false;
    }

    context.commit("saveLoginData", {
      userToken: authToken,
      decodedUserToken: decodedToken,
    });

    return true;
  },
  login(context, payload) {
    if (!isObject(payload)
      || !isString(payload.username)
      || !isString(payload.password)
    ) {
      return Promise.reject("Invalid Username and/or Password Provided");
    }

    const url = `${process.env.VUE_APP_API_URL}api/user/login`;
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      username: payload.username,
      password: payload.password,
    });

    return fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then((msg) => {
              throw msg;
            });
        }

        return res.json();
      })
      .then((msg) => {
        if (!('token' in msg)
          || !isString(msg.token)
        ) {
          throw "Invalid Response From Server";
        }

        const decodedToken = jwt.decode(msg.token);
        if (!decodedToken) {
          throw "Invalid JWT Token";
        }

        if (isTokenValid(decodedToken)) {
          context.commit("saveLoginData", {
            userToken: msg.token,
            decodedUserToken: decodedToken,
          });

          localStorage.setItem("kcmsAuthToken", msg.token);
        } else {
          throw "Invalid JWT Token";
        }
      });
  },
  logout(context) {
    context.commit("purgeLoginData");
    localStorage.removeItem("kcmsAuthToken");
  },
};

export {
  mutations,
  actions,
};
