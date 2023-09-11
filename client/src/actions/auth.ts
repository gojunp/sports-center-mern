import { AUTH, EMAIL_NOT_VERIFIED, LOGIN_ERROR, VERIFY,SIGNUP } from "../constants/actionTypes";
import * as api from "../api";
import { AppDispatch } from '..';


type FormData = {
    firstName?: String,
    lastName?: String,
    email?: String,
    password?: String,
    confirmPassword?: String
}

export const signup = (formData: FormData | any, isAdminCreation: boolean) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.signUp(formData, isAdminCreation);
        dispatch({ type: SIGNUP, data });
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData: FormData | any) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
    } catch (err) {
        console.log(err);
        dispatch({ type: LOGIN_ERROR });
        dispatch({ type: EMAIL_NOT_VERIFIED })
    }
}

export const verify = (id: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.verify(id, token);
        dispatch({ type: VERIFY, data });
    } catch (error) {
        console.log(error);

    }
}