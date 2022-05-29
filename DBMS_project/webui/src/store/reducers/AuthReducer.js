import { LOGIN, LOGOUT } from "../constants/action-type";

const initialState = {
    userId: '',   
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                userId: action.userId
            }
        case LOGOUT:
            return {
                ...state,
                userId: ''
            }
        default:
            return state
    }
}

export default authReducer;