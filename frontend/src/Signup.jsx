import React from 'react'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/signup',values)
        .then(res => {
            if(res.data.Status==="Success"){
                navigate('/login');
            }else{
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-primary p-3 rounded w-50'>
            <h2>Sign-In</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="name" placeholder='Enter Name' name='name' autoComplete='off'
                    onChange={e => setValues({...values, name:e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter email' name='email' autoComplete='off'
                    onChange={e => setValues({...values, email:e.target.value})} className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' autoComplete='off'
                    onChange={e => setValues({...values, password:e.target.value})} className='form-control rounded-0' />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
            </form>
            
        </div>
    </div>
  )
}

export default Signup