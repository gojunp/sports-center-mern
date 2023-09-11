import { AUTH, LOGIN_ERROR, VERIFY, SIGNUP } from "../constants/actionTypes";
import { AnyAction } from 'redux'


const authReducer = (state = { loginError: false, authData: [] }, action: AnyAction) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, authData: action.data };
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };
        case LOGIN_ERROR:
            return { ...state, loginError: true };
        case VERIFY:
            return { ...state, authData: state.authData.map((user) => user['_id'] === action.payload._id ? action.payload : user) };
        default:
            return state;
    }
}

export default authReducer