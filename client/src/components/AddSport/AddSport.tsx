import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks';
import FileBase from 'react-file-base64'
import { createSport } from '../../actions/sports';





const AddSport = () => {

    const dispatch = useAppDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const initialState = { name: '',descripton:'', photo: '', visible: false };
    const [formData, setFormData] = useState(initialState);
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [loginError, setLoginError] = useState(false)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createSport(formData))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        })
    }



    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Add a new sport

                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input onChange={handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg. Basketball" />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                                <input type="text" id="large-input" onChange={handleChange} name="description" className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, photo: base64 })} />
                            </div>
                            <div className="flex items-center mb-4">
                                <input onChange={handleCheck} id="default-checkbox" name='visible' type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make visible</label>
                            </div>

                            {(!isLogin && !passwordsMatch) && (<p className='pt-2 text-center text-red-500'>Passwords do not match!</p>)}
                            {(isLogin && loginError) && (<p className='text-center text-red-500'>Invalid credentials!</p>)}
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Add Sport
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddSport