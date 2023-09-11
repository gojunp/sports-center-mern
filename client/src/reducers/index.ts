import { combineReducers } from "redux";
import authReducer from './auth'
import sportsReducer from './sports'
import usersReducer from './users'


export default combineReducers({
    sportsReducer,
    usersReducer,
    authReducer,
});
