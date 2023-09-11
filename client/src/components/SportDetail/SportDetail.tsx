import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { checkEnrolled, enrollSport, getEnrolledUsers, getSport, rateSport, unEnrollSport } from '../../actions/sports';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../..'
import Comments from '../Comments/Comments';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi'
import { Accordion } from 'flowbite-react'
import { Rating, Typography } from '@mui/material';


const SportDetail = () => {
    const [group, setGroup] = useState("Youth");
    const [rating, setRating] = useState<number | null>(4.5)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const { sport }: any = useAppSelector((state: RootState) => state.sportsReducer)
    const { enrolled }: any = useAppSelector((state: RootState) => state.sportsReducer)
    const enrolledUsers: any = useAppSelector((state: RootState) => state.sportsReducer.enrolledUsers);


    const user = JSON.parse(localStorage.getItem('profile')!) ?? false;

    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && user.result.role === 'admin') {
            setIsAdmin(true);
            setLoggedIn(true)
        } else if (user) {
            setLoggedIn(true)
        }
    }, [user])

 /*    useEffect(() => {
        dispatch(checkEnrolled(id!, user.result._id))
        console.log(enrolled)
    }, []) */

    useEffect(() => {
        dispatch(getSport(id!));
        dispatch(checkEnrolled(id!, user.result._id))

        console.log(sport)
    }, [id,dispatch])

    useEffect(() => {
        dispatch(getEnrolledUsers(id!, group))
        console.log(group)
    }, [group])


    const average = sport?.rating?.reduce((a, b) => a + b, 0) / sport?.rating?.length;

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


    if (!sport) return <p>Loading ...</p>



    return (
        <div>
            <section className=" mx-auto relative bg-slate-100 mt-10 md:mt-none lg:mx-[10%] mx-2 md:mx-auto rounded shadow-xl select-none">
                <div className="container  px-6  pb-10 mx-auto">
                    <div className="mt-8 lg:-mx-6 lg:flex lg:items-center pt-5 md:mt-none">
                        <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={sport.photo} alt="" />

                        <div className="mt-6 lg:w-1/2 lg:mt-0 gap-4 md:gap-0 lg:mx-6 ">
                            <div className="rounded-md shadow float-right md:mr-20">
                            </div>

                            <p className="block top-0 text-2xl font-semibold text-black  md:text-3xl">
                                {sport.name}
                            </p>
                            {
                                loggedIn && enrolled && (<button type="button" onClick={() => { dispatch(unEnrollSport(id!, user.result._id)) }} className="mb-4 mt-4 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Unenroll
                                </button>)
                            } {loggedIn && (
                                <div className="mb-2 flex">
                                    <Rating
                                        name="simple-controlled"
                                        value={average}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                            dispatch(rateSport(newValue!, sport!._id))

                                        }}
                                    />
                                    <Typography component="legend">{round(average, 1)}</Typography>

                                </div>
                            )}
                            <p className="mt-3 text-md text-gray-400  md:text-lg">
                                {sport.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <Accordion>
                        {sport?.ageGroups?.map(({ name, day1, time1, day2, time2, day3, time3 }, index) => (
                            <Accordion.Panel key={index} >
                                <div onClick={() => { setGroup(name) }}>
                                    <Accordion.Title >
                                        {name}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="flex">
                                            <ul>
                                                <li><p className='text-md font-bold'>Group Times</p></li>
                                                <li>{day1} - {time1}</li>
                                                <li>{day2} - {time2}</li>
                                                <li>{day3} - {time3}</li>
                                            </ul>
                                            {loggedIn && isAdmin && (
                                                <ul className="pl-10">
                                                    <li><p className='text-md font-bold'>Enrolled Users</p></li>
                                                    {enrolledUsers.length === 0 && 'No enrolled users'}
                                                    {enrolledUsers?.map((user,index) => (
                                                        <li key={index} className='flex items-center'><BiUserCircle className='mr-2' />{user}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {loggedIn && !enrolled && (<button type="button" onClick={() => { dispatch(enrollSport(id!, name, user.result._id)) }} className="ml-10 mb-4 mt-4 h-[40px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <AiOutlinePlus className='text-white mr-2' />
                                                Enroll
                                            </button>)}
                                        </div>
                                    </Accordion.Content>
                                </div>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </div>
            </section>
            <Comments sport={sport} />
        </div>
    )
}

export default SportDetail