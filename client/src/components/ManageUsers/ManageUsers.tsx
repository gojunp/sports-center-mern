import React, { useEffect } from 'react'
import { RootState } from '../..'
import { deleteUser, getUsers } from '../../actions/users'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ManageUsers = () => {

    const { users } = useAppSelector((state: RootState) => state.usersReducer)


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers())
        console.log(users)
    }, [dispatch])


    return (
        <div className='mx-20 mt-10'>
            <button type="button" onClick={() => {
                navigate("/add-user")
            }}
                className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <AiOutlinePlus className='text-white mr-2' />
                Add User
            </button>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 ">
                                Name
                            </th>
                            <th scope="col" className="py-3  px-6">
                                Verified
                            </th>
                            <th scope="col" className="py-3  px-6">
                                Role
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Enrolled Classes
                            </th>
                            <th scope="col" className="py-3  px-6">
                                Edit
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map(({ _id, name, role, classesEnrolled, verified }, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {name}
                                </th>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {verified ? "Yes" : "No"}
                                </th>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {role}
                                </th>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {classesEnrolled}
                                </th>
                                <td className="py-4 px-6">
                                    <a href={`/edit-user/${_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => { dispatch(deleteUser(_id)) }} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageUsers