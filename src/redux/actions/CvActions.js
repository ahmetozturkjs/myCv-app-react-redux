import actionTypes from "./actionTypes";

export const CvStart=()=>{
    return{
        type:actionTypes.cv.CV_START
    }
    
}

export const CvSuccess=(payload)=>{
    return{
        type:actionTypes.cv.CV_SUCCESS,
        payload
    }
}
export const CvFail=(payload)=>{
    return{
        type:actionTypes.cv.CV_FAIL,
        payload
    }
}

export const CvAdd=(payload)=>{
    return{
        type:actionTypes.cv.CV_ADD,
        payload
    }
}

export const CvEdit=(payload)=>{
    return{
        type:actionTypes.cv.CV_EDIT,
        payload
    }
}
export const CvEducationAdd=(paylaod)=>{
    return{
        type:actionTypes.cv.CV_EDUCATION_ADD
    }
}
