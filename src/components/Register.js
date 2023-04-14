
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik'
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { useRef } from 'react';
import styles from '../styles/Username.module.css'

export default function Register() {

    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues : {
            username : '',
            email    : '',
            Password : ''
        },
        validate : registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            values = await Object.assign(values, { profile : file || ''})
            console.log(values)
        }
    })
    const inputRef = useRef(null);
    function handleClick() {
        inputRef.current.click();
      }
    /**formik doesnt support file uploaded so we need to create this handler*/
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
  return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass} styles={{width: "45%", paddingTop: '3em',}}>
                
                <div className="title flex flex-col items-center">
                    <h4 className='text-5xl font-bold'>Register</h4>
                    <span className='py-4 text-wl w-2/3 text-center text-gray-500'>
                        Happy to join you.
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                         <label htmlFor="">
                         <input ref={inputRef} type="file" hidden/> 
                         < img src={ file || avatar} width='50px' className={styles.profile_img} alt="avatar"  onClick={handleClick} />
                         </label>
                         <input onChange={onUpload} type="file" id='profile' name='profile' />
                         
                        
                    </div>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="password" placeholder='Username*' />
                        <input {...formik.getFieldProps('email')} className={styles.textbox} type="password" placeholder='Email*' />
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password*' />
                        <button className={styles.btn} type="submit">Register</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>Already Registered? <Link className='text-red-500' to="/">Login Now</Link></span>

                    </div>


                </form>
            </div>

        </div>
    </div>
  )
}

