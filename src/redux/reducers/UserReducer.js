import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  fail: false,
  errorMessage: "",
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.user.USER_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.user.USER_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        user: action.payload,
      };
    case actionTypes.user.USER_FAIL:
      return {
        ...state,
        start: false,
        success: false,
        fail: true,
        errorMessage: action.payload,
      };
    case actionTypes.user.USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
