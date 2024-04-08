import { useFormik } from 'formik'
import React, { useState } from 'react'
import ResetPassYup from '../Utils/Validation/ResetPassYup'
import Toaster from '../Utils/Toaster/Toaster'
import ResponseHandler from '../Utils/ResponseHandler/ResponseHandler'
import UserService from '../Services/User/UserService'
import { useNavigate } from 'react-router-dom'

export default function forgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const initValues = {
    email: '',
    password: '',
    token: '',
  }
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initValues,
    validationSchema: ResetPassYup.passwordReset,
    onSubmit: async (values) => {
      setLoading(true)
      Toaster.loadingToast("Sending Email .......")
      try {
        const result = await UserService.resetPassword(values.email)
        if (result.data.message.includes("Email Sent to")) {
          Toaster.justToast('success', result.data.message, () => {
            Toaster.dismissLoadingToast()
            navigate('/resetPassword')
          })
        }else if(result.data.code!==200){
          Toaster.justToast('error', result.data.message, () => {
          })
      }
      } catch (error) {
        Toaster.justToast('error', error)
        Toaster.dismissLoadingToast()
        console.error(error)
      }finally{
        Toaster.dismissLoadingToast()
        setLoading(false)
      }
    }
  })
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Reset Pasword</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <div>
          <input
            type='email'
            placeholder='Email'
            id='email'
            name="email"
            value={values.email}
            onChange={handleChange}
            className='bg-slate-100 p-3 rounded-lg w-full'
          />
          <p className='text-red-700 my-0'>{errors ? errors.email : ''}</p>

        </div>
        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
          Send Email
        </button>
      </form>

      <div className='flex mt-5'>
        <p className='mx-auto'>
          Enter The Email To reset Password
        </p>
      </div>
      <p className='text-red-700 mt-5'>{errors ? errors.message : ''}</p>
    </div>
  )
}
