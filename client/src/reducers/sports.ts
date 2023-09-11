import { CREATE, GET_ALL, GET_SPORT, ENROLL, GET_TERM_BY_GROUP, DELETE_GROUP, CREATE_GROUP, GET_GROUP, DELETE_SPORT, UPDATE_SPORT, GET_BY_SEARCH, COMMENT, RATING, UNENROLL, CHECK_ENROLLED, UPDATE_GROUP, GET_ENROLLED_USERS } from "../constants/actionTypes";
import { AnyAction } from 'redux'


const sportsReducer = (state = { enrolled: false, sports: [], enrolledUsers: [] }, action: AnyAction) => {
    //const eventReducer = (state = { events: [] }, action) => {

    switch (action.type) {
        case CREATE:
            return { ...state, sports: [...state.sports, action.payload] };
        case CREATE_GROUP:
            return { ...state, sports: [...state.sports, action.payload] };
        case GET_ALL:
            return { ...state, sports: action.payload };
        case GET_SPORT:
            return { ...state, sport: action.payload };
        case GET_TERM_BY_GROUP:
            return { ...state, sport: action.payload };
        case CHECK_ENROLLED:
            return { ...state, enrolled: action.payload };

        case UNENROLL:
        case ENROLL:
            return { ...state, sport: action.payload };
        case GET_GROUP:
            return { ...state, sport: action.payload };
        case DELETE_SPORT:
        case DELETE_GROUP:
            return { ...state, sports: state.sports.filter((sport) => sport['_id'] !== action.payload) }

        case RATING:
        case UPDATE_SPORT:
        case UPDATE_GROUP:
            return { ...state, sports: state.sports.map((sport) => sport['_id'] === action.payload._id ? action.payload : sport) }
        case GET_BY_SEARCH:
            return { ...state, sports: action.payload };
        case GET_ENROLLED_USERS:
            return { ...state, enrolledUsers: action.payload };
        case COMMENT:
            return {
                ...state, sports: state.sports.map((sport) => {
                    if (sport['_id'] === action.payload._id) return action.payload;
                    return sport;
                })
            }
        default:

            return state;
    }
}

export default sportsReducer