import React, { useEffect, useState } from 'react'
import { Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { rateSport } from '../../actions/sports';
import { useAppDispatch } from '../../hooks';

const SportCard = ({ _id, name, photo, ratings }: { _id: string, name: string, photo: any, ratings: [number] }) => {


    const [rating, setRating] = useState<number | null>(4.5)
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem('profile')!) ?? false;
    console.log(user)

    useEffect(() => {
        if (user && user.result.role === 'admin') {
            setIsAdmin(true);
        }
    }, [user])

    const openSport = () => {
        navigate(`/sports/${_id}`)
    }
    
    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    console.log(name, " ", average);

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


    return (
        <div className="max-w-sm w-md bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-[325px] h-[300px]" src={photo} alt="sport" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                {user && (
                    <div className="mb-2 flex">
                        <Rating
                            name="simple-controlled"
                            value={average}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                                dispatch(rateSport(newValue!, _id))

                            }}
                        />
                        <Typography component="legend">{round(average, 1)}</Typography>
                    </div>
                )}
                <button onClick={() => { openSport() }} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    See more
                </button>
            </div>
        </div>
    )
}

export default SportCard