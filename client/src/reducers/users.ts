import { CREATE_USER, DELETE_SPORT, GET_ALL_USERS, GET_USER, UPDATE_SPORT } from "../constants/actionTypes";
import { AnyAction } from 'redux'


const usersReducer = (state = { users: [] }, action: AnyAction) => {

    switch (action.type) {
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload] };
        case GET_ALL_USERS:
            return { ...state, users: action.payload };
        case GET_USER:
            return { ...state, user: action.payload };
        case DELETE_SPORT:
            return { ...state, sports: state.users.filter((user) => user['_id'] !== action.payload) }
        case UPDATE_SPORT:
            return { ...state, sports: state.users.map((user) => user['_id'] === action.payload._id ? action.payload : user) }

        default:
            return state;
    }
}

export default usersReducer