import actionTypes from "../actions/actionTypes";

const initialState={
    start:false,
    success:false,
    fail:false,
    errorMessage:"",
    cv:null
}

const CvReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.cv.CV_START:
            
            return{
                ...state,
                start:true
            };
        case actionTypes.cv.CV_SUCCESS:
            return{
                ...state,
                start:false,
                success:true,
                cv:action.payload
            }
        case actionTypes.cv.CV_FAIL:
        return{
            ...initialState,
           fail:true,
           errorMessage:action.payload
        }

        case actionTypes.cv.CV_ADD:
        return{
            ...state,
            cv:[...state.cv,action.payload]
        }
        case actionTypes.cv.CV_EDIT:
            const editCvFilter=state.cv.filter(cv=>cv.id!==action.payload.id)
            return{
                ...state,
                cv:[...editCvFilter,action.payload]

            }
      
            
        default:
            return state;
    }
}

export default CvReducer