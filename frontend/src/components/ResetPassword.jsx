import React, { useState } from 'react'
import ResetPassYup from '../Utils/Validation/ResetPassYup'
import UserService from '../Services/User/UserService'
import { useFormik } from 'formik'
import Toaster from '../Utils/Toaster/Toaster'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const initValues = {
        password: '',
        token: '',
    }
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initValues,
        validationSchema: ResetPassYup.addNewPass,
        onSubmit: async (values) => {
            setLoading(true)
            Toaster.loadingToast("Ressetting Password .......")
            try {
                const result = await UserService.addNewPassword(values.token, values.password)
                console.log(result)
                if (result.data.message.includes("successfully")) {
                    Toaster.justToast('success', result.data.message, () => {
                        navigate('/sign-in')
                    })
                }else if(result.data.code!==200){
                    Toaster.justToast('error', result.data.message, () => {
                    })
                }
            } catch (error) {
                Toaster.justToast('error', error, () => { })
                console.error(error)
                Toaster.dismissLoadingToast()
                
            }finally{
                Toaster.dismissLoadingToast()
                setLoading(false)
            }
        }
    })
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Enter New Password</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <div className=''>
                    <input
                        type='password'
                        placeholder='Enter New Password'
                        id='password'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className='bg-slate-100 p-3 rounded-lg w-full' // Set width to full
                    />
                    <p className='text-red-700 my-0'>{errors ? errors.password : ''}</p>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Enter The token'
                        id='token'
                        name="token"
                        value={values.token}
                        onChange={handleChange}
                        className='bg-slate-100 p-3 rounded-lg w-full' // Set width to full
                    />
                    <p className='text-red-700 my-0'>{errors ? errors.token : ''}</p>
                </div>
                <button
                    type='submit'
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full' // Set width to full

                >
                    Submit New Password
                </button>
            </form>
            <div className='flex mt-5'>
                <p className='mx-auto'>
                    Enter the token send to your email to reset password
                </p>
            </div>
        </div>
    )
}
