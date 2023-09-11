import React, { useEffect, useState } from 'react'
import SportCard from '../SportCard/SportCard'
import { useSelector } from 'react-redux'
import { RootState } from '../..'
import { getSports, createGroup, getSportsBySearch } from '../../actions/sports'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router-dom'


type Sport = {
    name: string,
    picture: string
}

/* type Sports = {
    sports: [Sport]
} */

const Sports = () => {


    const dispatch = useAppDispatch();
    const [age, setAge] = useState("");
    const [sport, setSport] = useState("")
    const navigate = useNavigate();





    //let sports: [Sport] 

    const { sports } = useAppSelector((state: RootState) => state.sportsReducer)


    const search = () => {
        // if (sport.trim() && age.trim()) {
        dispatch(getSportsBySearch(sport, age));
        navigate(`/sports/search/sport?searchQuery=${sport || ''}&age=${age || ''}`);
        /*   } else {
            navigate("/")
          } */
    }


    useEffect(() => {
        dispatch(getSports());
        //dispatch(createGroup());    
    }, [dispatch])

    if (!sports) return <p>Loading ...</p>

    return (
        <div className=' mt-10 mx-20'>
            <div className="flex mb-5 w-[500px]">
                {/*                   <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
 */}                  {/* <div id="dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{ "position": "absolute", "inset": "auto auto 0px 0px", "margin": "0px", "transform": "translate3d(897px, 5637px, 0px)" }}>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                      </li>
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                      </li>
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                      </li>
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                      </li>
                    </ul>
                  </div> */}
                <select value={age} onChange={(e) => setAge(e.target.value)} className='className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-8 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"'>
                    <option value="">Choose Age</option>
                    <option value="Children">Children</option>
                    <option value="Youth">Youth</option>
                    <option value="Young adults">Young adults</option>
                    <option value="Adults">Adults</option>

                </select>
                <div className="relative w-full">
                    <input type="search" onChange={(e) => setSport(e.target.value)} value={sport} id="search-dropdown" className="block p-2.5 mr-20 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Classes (comma separated)" required />
                    <button onClick={search} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
            <p className='text-5xl mb-4 font-bold'>Sports</p>
            <div className="grid grid-cols-4 gap-10 mb-10">
                {sports.map(({ _id, name, photo, rating, visible }: { _id: string, name: string, photo: string, rating: [number], visible: boolean }, index: number) => {
                    return (
                        visible && (
                            <div>
                                <SportCard _id={_id} name={name} photo={photo} ratings={rating} />
                            </div>
                        )

                    )
                })}
            </div>
        </div>
    )
}

export default Sports