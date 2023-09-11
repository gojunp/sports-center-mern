import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { verify } from '../../actions/auth';
import { useAppDispatch } from '../../hooks';
import verifiedImg from '../../../src/assets/img/verified.png';
import { useNavigate } from 'react-router-dom';


const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const verifyEmailUrl = async () => {
        try {
            dispatch(verify(param.id!, param.token!))
            setValidUrl(true);
        } catch (error) {
            console.log(error)
            setValidUrl(false)
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, [param])

    return (
        <div>
            {validUrl ? (
                <div className='grid place-items-center h-screen' >
                    <div className='items-center'>
                        <img className='h-[300px] w-[300px]' alt="verifiedImg" src={verifiedImg} />
                        <h1 className='text-center font-bold text-lg'>Email verified successfully!</h1>
                        <div className="flex flex-col justify-center items-center">
                            <button type="button" onClick={() => { navigate("/sports") }} className="text-white bg-blue-600 mt-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go to Home Page</button>

                        </div>
                    </div>

                </div>
            ) : (
                <div className='grid place-items-center h-screen' >
                    <div className='items-center'>
                        <h1 className='text-center font-bold text-lg'>Error 404: Not Found</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmailVerify