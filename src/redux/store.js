import {createStore,combineReducers} from "redux"
import LoginReducer from "./reducers/LoginReducer"
import UserReducer from "./reducers/UserReducer"
import CvReducer from "./reducers/CvReducer"

const rootReducer=combineReducers({
    LoginState:LoginReducer,
    UserState:UserReducer,
    CvState:CvReducer

})

const store=createStore(rootReducer)

export default store