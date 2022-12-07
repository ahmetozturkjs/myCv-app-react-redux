import actionTypes from "./actionTypes"

export const userStart=()=>{
    return{
        type:actionTypes.user.USER_START
    }
}

export const userSuccess=(payload)=>{
    return{
        type:actionTypes.user.USER_SUCCESS,
        payload
    }
}
export const userFail=(payload)=>{
    return{
        type:actionTypes.user.USER_FAIL,
        payload
    }
}

export const userUpdate=(payload)=>{
    return{
        type:actionTypes.user.USER_UPDATE,
        payload
    }
}