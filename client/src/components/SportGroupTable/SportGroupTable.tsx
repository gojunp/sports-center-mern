import React, { useEffect } from 'react'
import { RootState } from '../..'
import { deleteGroup, deleteSport, getSport, getSports } from '../../actions/sports'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

const SportGroupTable = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { sport }: any = useAppSelector((state: RootState) => state.sportsReducer)


    useEffect(() => {
        dispatch(getSport(id!))
    }, [id, dispatch])

    useEffect(() => {
        console.log(sport)
    }, [sport])

    if (!sport) return <p>Loading ...</p>


    return (
        <div className='mx-20 mt-10'>
            <button type="button" onClick={() => { navigate(`/add-group/${sport._id}`) }} className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <AiOutlinePlus className='text-white mr-2' />
                Add Group
            </button>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 ">
                                Group Name
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                Times
                            </th>
                            <th scope="col" className="py-3  px-6">
                                Edit Group
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Delete Group
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {sport.ageGroups.map((ageGroup, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ageGroup.name}
                                </th>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <ul>
                                        <li> {ageGroup.day1} - {ageGroup.time1}</li>
                                        <li> {ageGroup.day2} - {ageGroup.time2}</li>
                                        <li> {ageGroup.day3} - {ageGroup.time3}</li>
                                    </ul>
                                </th>
                                {/* <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ageGroups.map((group) => (
                                        <p>{group.name}</p>
                                    ))}


                                </th> */}
                                <td className="py-4 px-6">
                                    <a href={`/edit-group/${sport._id}/${ageGroup._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="py-4 px-6">
                                    <p onClick={() => { dispatch(deleteGroup(id!, ageGroup._id)) }} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</p>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default SportGroupTable