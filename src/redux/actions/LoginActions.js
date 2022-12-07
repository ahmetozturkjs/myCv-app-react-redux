import actionTypes from "./actionTypes";

export const loginStart=()=>{
    return{
        type:actionTypes.login.LOGIN_START
    }
    
}

export const loginSuccess=(payload)=>{
    return{
        type:actionTypes.login.LOGIN_SUCCESS,
        payload
    }
}
export const loginFail=(payload)=>{
    return{
        type:actionTypes.login.LOGIN_FAIL,
        payload
    }
}

export const logout=()=>{
    return{
        type:actionTypes.login.LOGOUT
    }
}