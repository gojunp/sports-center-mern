import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { signup, signin } from '../../actions/auth';
import { RootState } from '../..';

const Form = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isAdminCreation, setIsAdminCreation] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'user' };
    const [formData, setFormData] = useState(initialState);
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [loginError, setLoginError] = useState(false)
    const [verification, setVerification] = useState(false)
    const location = useLocation();


    const error = useAppSelector((state: RootState) => state.authReducer.loginError);

    useEffect(() => {
        if (location.pathname === "/add-user") {
            setIsAdminCreation(true);
        } else {
            setIsAdminCreation(false)
        }
    }, [location])



    useEffect(() => {
        if (error) setLoginError(true)
    }, [error])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(signin(formData))
            navigate("/sports")
        } else {
            if (formData.password !== formData.confirmPassword) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true)
                setVerification(true);

                dispatch(signup(formData, isAdminCreation));
            }
        }
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

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">


                        {isAdminCreation ? (
                            <>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
                                    <select onChange={handleRole} name="role" value={formData.role} id="countries_disabled" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Choose a role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>

                                    </select>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input onChange={handleChange} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input onChange={handleChange} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input onChange={handleChange} type="password" name="confirmPassword" id="confirPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    {(!passwordsMatch) && (<p className='pt-2 text-center text-red-500'>Passwords do not match!</p>)}
                                    {(verification) && (<p className='pt-2 text-center text-green-500'>Verification email sent! Check your email</p>)}

                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Create Account
                                    </button>
                                </form>
                            </>
                        ) : (
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    {!isLogin ? "Create an account" : "Log in"}

                                </h1>
                                {!isLogin && (

                                    <>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                            <input onChange={handleChange} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                            <input onChange={handleChange} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                    <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {!isLogin && (
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input onChange={handleChange} type="password" name="confirmPassword" id="confirPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                )}

                                {(!isLogin && !passwordsMatch) && (<p className='pt-2 text-center text-red-500'>Passwords do not match!</p>)}
                                {(verification) && (<p className='pt-2 text-center text-green-500'>Verification email sent! Check your email</p>)}
                                {(isLogin && loginError) && (<p className='text-center text-red-500'>Invalid credentials or email not verified!</p>)}
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    {!isLogin ? "Create an account" : "Log in"}
                                </button>
                                {!isLogin ? (
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">

                                        Already have an account? <p className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setIsLogin(true) }}>Log in here</p>
                                    </p>
                                ) : (
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">

                                        Don't have an account? <p className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { setIsLogin(false) }}>Sign up here</p>
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form