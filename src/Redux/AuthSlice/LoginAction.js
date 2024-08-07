import axios from "axios";
import { API_BASE_URL } from "../../Config/Api.js";
import * as actions from "../AuthSlice/AuthActionType.js";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    console.log(loginData);
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log(data);
    if (data.jwt) {
      console.log("In if block")
      console.log(data)
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: actions.LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: actions.LOGIN_USER_FALIURE, payload: error.message });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    console.log(registerData);
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    console.log("signup user:", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: actions.REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: actions.REGISTER_USER_FALIURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },

    });
    console.log("data")
    // JSON.parse(data.user);
    console.log("fgbfdglkghoisdghoidsn")
    console.log(data.length);
    const str = data.substring(data.length/2);
    console.log(str);
    // const parts = data.user.split("\\}{1}");
    console.log("half String")
    
    // console.log(parts[0])
    dispatch({ type: actions.GET_USER_PROFILE_SUCCESS, payload: JSON.parse(str) });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: actions.GET_USER_PROFILE_FALIURE, payload: error.message });
  }
};
