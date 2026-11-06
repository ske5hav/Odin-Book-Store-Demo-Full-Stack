
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = ({setUser}) => {

    const [from,setFrom]=useState({
        email:"",
        password:"",
    })
    
    const [error,setError] =useState("")
    const navigate=useNavigate()
    const handlesumbit= async (e)=>{
        e.preventDefault();
        try{
            {/* This is use to api from  backend  */}
            const res = await axios.post("http://localhost:5000/api/auth/login",from)
            setUser(res.data.user)
            navigate("/")
        }catch(error){
            setError("invalide email,password")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">

        {/* Logo */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c79324] text-3xl text-white shadow-lg">
          <span><img src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg" alt="" /></span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h1>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Login to your Odin Book Store account
        </p>

        {/* Login Form UI */}
        <form className="space-y-5" onSubmit={handlesumbit}>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
            value={from.email}
             onChange={(e)=>setFrom({...from,email:e.target.value})}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              value={from.password}
              onChange={(e)=>setFrom({...from,password:e.target.value})}
              
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

         

          <button
            type="submit"
            className="w-full rounded-xl bg-[#c79324] py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#d6a43b]"
          >
            Login
          </button>

        </form>

        {/* Register Link UI */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?
          <span className="ml-1 cursor-pointer font-semibold text-indigo-600">
            <Link to="/register" className='text-[#c79324]'>Register</Link>
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login
