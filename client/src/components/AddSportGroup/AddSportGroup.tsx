import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { createGroup } from '../../actions/sports';
import TimePicker from 'react-time-picker';

type InitialState = {
    name: string,
    day1: string,
    day2: string,
    day3: string,
    time1: string,
    time2: string,
    time3: string
}


const AddSportGroup = () => {

    const dispatch = useAppDispatch();
    const initialState: InitialState = { name: '', day1: '', day2: '', day3: '', time1: '', time2: '', time3: '' };
    const [formData, setFormData] = useState(initialState);
    const { id } = useParams();

    const handleDayChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var value = e.target.value
        setFormData({ ...formData, name: value });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGroup(id!, formData))
        console.log(formData)
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Group Manager

                        </h1>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an age group</label>
                        <select onChange={handleGroupChange} value={formData.name} id="countries_disabled" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Choose an age group</option>
                            <option value="Children">Children</option>
                            <option value="Youth">Youth</option>
                            <option value="Young adults">Young Adults</option>
                            <option value="Adults">Adults</option>
                        </select>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a day in the week</label>

                        <div className='flex'>
                            <select id="countries_disabled" onChange={handleDayChange} name="day1" value={formData.day1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a day in the week</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>

                            </select>
                            <TimePicker onChange={(value) => { setFormData({ ...formData, time1: value }) }} value={formData.time1} />


                        </div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a day in the week</label>

                        <div className='flex'>
                            <select id="countries_disabled" name="day2" onChange={handleDayChange} value={formData.day2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a day in the week</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>

                            </select>
                            <TimePicker onChange={(value) => { setFormData({ ...formData, time2: value }) }} value={formData.time2} />

                        </div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a day in the week</label>

                        <div className='flex'>
                            <select id="countries_disabled" name="day3" onChange={handleDayChange} value={formData.day3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a day in the week</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>

                            </select>
                            <TimePicker onChange={(value) => { setFormData({ ...formData, time3: value }) }} value={formData.time3} />
                        </div>
                        <button onClick={(e) => { handleSubmit(e) }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Submit Group
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSportGroup