import React, { useState, useEffect } from 'react'
import { commentSport } from '../../actions/sports'
import { useAppDispatch } from '../../hooks'

const Comments = ({ sport }) => {

    const [comments, setComments] = useState([sport?.comments])
    const [comment, setComment] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useAppDispatch()
    const postId = sport._id


    const user = JSON.parse(localStorage.getItem('profile')!) ?? false;

    useEffect(() => {
        if (user && user.result.role === 'admin') {
            setIsAdmin(true);
            setLoggedIn(true)
        } else if (user) {
            setLoggedIn(true)
        }
    }, [user])



    const submitComment = async (comment: string, id: string) => {
        const newComments = await dispatch(commentSport(comment, id))
        setComments(newComments)
        setComment("")
    }

    useEffect(() => {
        console.log(comment)
    }, [comment])

    return (
        <section className=" mx-auto relative bg-slate-100 mt-5 pt-5 md:mt-none lg:mx-[10%] mx-2 md:mx-auto rounded shadow-xl select-none">
            <div className="mx-10 mb-10">
                {isAdmin && (<div>
                    <p className='text-3xl mb-4 pt-4 font-bold'>Comments</p>
                    {comments.map((comment, index) => (
                        <div key={index} className="bg-slate-200 mb-10">
                            <ul>
                                <li className="ml-5 py-4 h-[100px] text-md" >{comment}</li>
                            </ul>
                        </div>
                    ))}
                </div>)}


                {loggedIn && (
                    <div className=" flex pb-10 mb-2 mt-10 w-full">
                        <label className="block mb-2 pr-10 text-sm font-medium text-gray-900 dark:text-gray-300">Leave a comment</label>
                        <input
                            className="block p-4 w-[400px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="large-input"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={() => submitComment(comment, postId)} type="button"
                            className="mb-4 ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Comment
                        </button>
                    </div>
                )}

            </div>
        </section>

    )
}

export default Comments