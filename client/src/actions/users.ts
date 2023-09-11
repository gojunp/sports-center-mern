import {GET_ALL_USERS, GET_USER, UPDATE_USER, DELETE_USER} from './../constants/actionTypes'
import * as api from "../api";
import { AppDispatch } from '..';

type UpdateUserData = {
    firstName: String,
    lastName:String,
    email: String,
    role: String,
}

export const getUsers = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: GET_ALL_USERS, payload: data });
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const getUser = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (id:string, user:UpdateUserData) => async (dispatch:AppDispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: UPDATE_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id:string) => async (dispatch:AppDispatch) => {
    try {
        await api.deleteUser(id)
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        console.log(error);
    }
}