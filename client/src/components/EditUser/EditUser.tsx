import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../..';
import { getUser, updateUser } from '../../actions/users';

const EditUser = () => {

    const {user}: any = useAppSelector((state: RootState) => state.usersReducer)
    const {id} = useParams();

    const dispatch = useAppDispatch();
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role:'' };
    const [formData, setFormData] = useState(initialState);

    useEffect(()=>{
        dispatch(getUser(id!));
    },[id,dispatch])

    useEffect(()=>{
        if(user){
        const firstName = user.name.split(' ')[0];
        const lastName = user.name.split(' ')[1];
        setFormData({...formData, firstName: firstName, lastName: lastName, email: user.email, role: user.role})
        console.log(user)
        console.log("FORm",formData)
        }
    },[user])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(id!,formData))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var value = e.target.value
        setFormData({ ...formData, role: value });
    }

    if(!user) return <p>Loading...</p>


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Edit {user.name}

                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select user role</label>
                            <select onChange={handleRole} name="role" value={formData.role} id="countries_disabled" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                                <div className='flex'>
                                    <div className='mx-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input onChange={handleChange} value={formData.firstName} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                                    </div>
                                    <div className='mx-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input onChange={handleChange} value={formData.lastName} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                                    </div>
                                </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditUser