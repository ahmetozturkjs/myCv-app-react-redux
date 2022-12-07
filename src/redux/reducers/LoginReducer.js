import actionTypes from "../actions/actionTypes";

const initialState={
    start:false,
    success:false,
    fail:false,
    errorMessage:"",
    email:"",
    token:""
}

const LoginReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.login.LOGIN_START:
            return{
                ...state,
                start:true
            }
            case actionTypes.login.LOGIN_SUCCESS:
                return{
                    ...state,
                    start:false,
                    success:true,
                    email:action.payload.email,
                    token:action.payload.token
                }
            case actionTypes.login.LOGIN_FAIL:
                return{
                    ...state,
                    start:false,
                    success:false,
                    fail:true,
                    errorMessage:action.payload
                }
            case actionTypes.login.LOGOUT:
                return{
                    ...initialState
                }
    
        default:
            return state;
    }
}

export default LoginReducer