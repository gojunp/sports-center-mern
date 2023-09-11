import { CREATE, GET_ALL, GET_SPORT, UPDATE_GROUP,GET_ENROLLED_USERS, CREATE_GROUP, CHECK_ENROLLED, GET_GROUP, UPDATE_SPORT, DELETE_GROUP, DELETE_SPORT, GET_BY_SEARCH, COMMENT, RATING, UNENROLL, ENROLL } from './../constants/actionTypes'
import * as api from "../api";
import { AppDispatch } from '..';


type CreateSportData = {
    name: String,
    visible: boolean,
    photo: String,

}

export type CreateGroupData = {
    name: String,
    day1: String,
    day2: String,
    day3: String,
    time1: String,
    time2: String,
    time3: String
}


export const createSport = (formData: CreateSportData | any) => async (dispatch: AppDispatch) => {
    try {

        const { data } = await api.createSport(formData);
        console.log("OK")
        if (data || data !== null) {
            dispatch({ type: CREATE, payload: data });
        }
    } catch (error) {
        console.log("FAILED ", error)

    }
}

export const updateSport = (id: string, sport: CreateSportData) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.updateSport(id, sport);
        dispatch({ type: UPDATE_SPORT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteSport = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await api.deleteSport(id)
        dispatch({ type: DELETE_SPORT, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const createGroup = (id: string, group: CreateGroupData) => async (dispatch: AppDispatch) => {
    try {

        const { data } = await api.createGroup(id, group);
        console.log(data)
        console.log("OK")
        if (data || data !== null) {
            dispatch({ type: CREATE_GROUP, payload: data });
        }
    } catch (error) {
        console.log("FAILED ", error)

    }
}

export const editGroup = (id: string, groupId: string, group: CreateGroupData) => async (dispatch: AppDispatch) => {
    try {
        const data = await api.editGroup(id, groupId, group);
        dispatch({ type: UPDATE_GROUP, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const getSports = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getSports();
        dispatch({ type: GET_ALL, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const getSport = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getSport(id);
        dispatch({ type: GET_SPORT, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const getTermByGroup = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getTermByGroup(id);
        dispatch({ type: GET_SPORT, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const getSportGroup = (id: string, groupId: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getSportGroup(id, groupId);
        dispatch({ type: GET_GROUP, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteGroup = (id: string, groupId: string) => async (dispatch: AppDispatch) => {
    try {
        console.log(id);
        console.log(groupId)
        await api.deleteGroup(id, groupId)
        dispatch({ type: DELETE_GROUP, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const getSportsBySearch = (searchQuery: string, age: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getSportsBySearch(searchQuery, age);
        dispatch({ type: GET_BY_SEARCH, payload: data })
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const commentSport = (comment: string, id: string) => async (dispatch: AppDispatch) => {
    try {
        console.log(comment)
        const { data } = await api.commentSport(comment, id)
        dispatch({ type: COMMENT, payload: data })
        console.log(data)
        return data.comments;

    } catch (error) {
        console.log(error)
    }
}

export const rateSport = (rating: Number, id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.rateSport(rating, id);
        dispatch({ type: RATING, payload: data });
    } catch (error) {
        console.log(error)

    }
}

export const enrollSport = (sportId: string, group: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
        //console.log(sportId)
        const { data } = await api.enrollSport(sportId, group, userId);
        dispatch({ type: ENROLL, payload: data });
    } catch (error) {
        console.log(error)

    }
}

export const unEnrollSport = (sportId: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
        //console.log(sportId)
        const { data } = await api.unEnrollSport(sportId, userId);
        dispatch({ type: UNENROLL, payload: data });
    } catch (error) {
        console.log(error)

    }
}

export const checkEnrolled = (sportId: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
        //console.log(sportId)
        const { data } = await api.checkEnrolled(sportId, userId);
        dispatch({ type: CHECK_ENROLLED, payload: data });
        console.log(data)
        // return data;
    } catch (error) {
        console.log(error)

    }
}

export const getEnrolledUsers = (sportId:string,group:string) => async (dispatch: AppDispatch) => {
    try{
        const { data } = await api.getEnrolledUsers(sportId, group);
        dispatch({ type: GET_ENROLLED_USERS, payload: data });
        console.log(data)
    }catch(error){
        console.log(error)
    }
}