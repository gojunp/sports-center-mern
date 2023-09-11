import React, {useEffect} from 'react'
import { RootState } from '../..'
import { deleteSport, getSports } from '../../actions/sports'
import { useAppDispatch,useAppSelector } from '../../hooks'
import {AiOutlinePlus} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ManageSports = () => {

    const {sports} = useAppSelector((state: RootState) => state.sportsReducer)


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getSports())
    },[dispatch])


  return (
    <div className='mx-20 mt-10'>
        <button type="button" onClick={()=> {navigate("/add-sport")}} className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <AiOutlinePlus className='text-white mr-2'/>
  Add Sport
</button>
        
<div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-10">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6 ">
                    Sport Name
                </th>
                <th scope="col" className="py-3 px-6 ">
                    Visible
                </th>
                <th scope="col" className="py-3 px-6 ">
                    Available Groups
                </th>
                <th scope="col" className="py-3  px-6">
                    Edit Info
                </th>
                <th scope="col" className="py-3  px-6">
                    View Groups
                </th>
                <th scope="col" className="py-3 px-6">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>

            {sports.map(({_id,name,ageGroups,visible},index)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {name}
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {visible === true ? 'Yes' : 'No'}
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ageGroups.map((group)=>(
                        <p>{group.name}</p>
                    ))}
                    
                    
                </th>
                <td className="py-4 px-6">
                    <a href={`edit-class/${_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Info</a>
                </td>
                <td className="py-4 px-6">
                    <a href={`groups/${_id}`}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Groups</a>
                </td>
                {/* <td className="py-4 px-6">
                    <a href={`edit-group/${_id}`}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Groups</a>
                </td> */}
                <td className="py-4 px-6">
                    <a href="#" onClick={()=> {dispatch(deleteSport(_id))}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
                
            </tr>
            ))}
        </tbody>
    </table>
</div>

    </div>
  )
}

export default ManageSports