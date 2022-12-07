const actionTypes = {
  login: {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT: "LOGOUT",
  },
  user:{
    USER_START: "USER_START",
    USER_SUCCESS: "USER_SUCCESS",
    USER_FAIL: "USER_FAIL",
    USER_UPDATE:"USER_UPDATE"
  },
  cv:{
    CV_START:"CV_START",
    CV_SUCCESS:"CV_SUCCESS",
    CV_FAIL:"CV_FAIL",
    CV_ADD:"CV_ADD",
    CV_EDIT:"CV_EDIT",
    CV_EDUCATION_ADD:"CV_EDUCATION_ADD"

  }
};
export default actionTypes;
