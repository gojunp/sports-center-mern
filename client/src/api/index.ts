import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })


type CreateSportData = {
    name: String,
    visible: boolean,
    photo: String,

}

type UpdateUserData = {
    firstName: String,
    lastName:String,
    email: String,
    role: String,
}

type CreateGroupData = {
    name: String,
    day1: String,
    day2: String,
    day3: String,
    time1:String,
    time2:String,
    time3:String
}


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers = req.headers ?? {};
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`;

    }
    return req;
});

export const signUp = (formData: FormData, isAdminCreation:boolean) => API.post('/users/signup', formData)

export const signIn = (formData: FormData) => API.post('/users/signin', formData)

export const verify = (id: string,token:string) => API.patch(`/users/verify/${id}/${token}`)

export const updateUser = (id:string, updatedUser: UpdateUserData) => API.patch(`/users/edit-user/${id}`, updatedUser)

export const deleteUser = (id: string) => API.delete(`/users/delete/${id}`)

export const createSport = (newSport: CreateSportData) => API.post('/sports/create-sport', newSport)

export const updateSport = (id:string, updatedSport: CreateSportData) => API.patch(`sports/edit-class/${id}`, updatedSport)

export const commentSport = (comment: string, id: string) => API.post(`/sports/${id}/commentSport`, {comment})

export const rateSport = (rating:Number,id:string) => API.patch(`/sports/${id}/rateSport`, {rating})

export const deleteSport = (id: string) => API.delete(`/sports/delete-sport/${id}`,)

export const getSports = () => API.get('/sports')

export const enrollSport = (sportId:string,group:string,userId:string) => API.patch(`/sports/enroll/${sportId}/${group}/${userId}`);

export const unEnrollSport = (sportId:string,userId:string) => API.patch(`/sports/unenroll/${sportId}/${userId}`);

export const checkEnrolled = (sportId:string,userId:string) => API.get(`/sports/checkEnrolled/${sportId}/${userId}`);

export const getEnrolledUsers = (id:string,group:string) => API.get(`sports/group/${id}/${group}`)

export const editGroup = (id:string,groupId:string,group:CreateGroupData) => API.patch(`/sports/edit-group/${id}/${groupId}/edit`,{group});

export const getUsers = () => API.get('/users/all')

export const getUser = (id:string) => API.get(`/users/user/${id}`)

export const getSport = (id:string) => API.get(`/sports/${id}`)

export const getTermByGroup = (id:string) => API.get(`/sports/${id}/term`)

export const createGroup = (id:string, group:CreateGroupData) => API.post(`/sports/create-group/${id}`,group)

export const getSportGroup = (id: string, groupId:string) => API.get(`/sports/edit-group/${id}/${groupId}`)

export const getSportsBySearch = (searchQuery: string,age:string) => API.get(`/sports/search/sport?searchQuery=${searchQuery || ''}&age=${age || ''}`)

export const deleteGroup = (id:string,groupId:string) => API.delete(`/sports/delete-group/${id}/${groupId}`)