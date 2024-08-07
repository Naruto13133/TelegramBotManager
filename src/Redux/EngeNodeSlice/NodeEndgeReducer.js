import * as actions from "./EngeNodeActionType.js";

const initialState = {
};

export const EdgeNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_USER_REQUEST:
    case actions.REGISTER_USER_REQUEST:
    case actions.GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case actions.LOGIN_USER_SUCCESS:
    case actions.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case actions.GET_USER_PROFILE_SUCCESS:
      console.log("data0")
      console.log(action.payload)
      console.log("data0")
      return { ...state, loading: false, error: null, user: action.payload };

    case actions.LOGIN_USER_FALIURE:
    case actions.REGISTER_USER_FALIURE:
    case actions.GET_USER_PROFILE_FALIURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
