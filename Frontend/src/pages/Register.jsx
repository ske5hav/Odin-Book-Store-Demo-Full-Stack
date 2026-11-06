
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({setUser}) => {
    
    const [form,setFrom]=useState({
        name:"",
        email:"",
        password:"",
    })
    
    const [error,setError] =useState("")
    const navigate=useNavigate()



    const handlesumbit= async (e)=>{
        e.preventDefault();
        try{
            {/* this is use to api fo registaion from backend */}
            const res = await axios.post("/api/auth/register",form)
            setUser(res.data)
            navigate("/")
        }catch(error){
            setError("Ragistation faild")
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">

        {/* Logo */}
        <div className=" bg-[#c79324] mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl  text-3xl text-white shadow-lg">
          <span><img lassName=" bg-[#c79324]" src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg" alt="" /></span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h1>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          Rigister to your Odin Book Store account
        </p>

        {/*  UI */}
        <form className="space-y-5" onSubmit={handlesumbit}>
           
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Name
            </label>

            <input
            value={form.name}
             onChange={(e)=>setFrom({...form,name:e.target.value})}
              type="text"
              placeholder="name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
            value={form.email}
             onChange={(e)=>setFrom({...form,email:e.target.value})}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
             
             className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              value={form.password}
              onChange={(e)=>setFrom({...form,password:e.target.value})}
              
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

         

          <button
            type="submit"
            className="w-full rounded-xl bg-[#c79324] py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#d6a43b]"
          >
            Rigister
          </button>

        </form>

       
        <p className="mt-7 text-center text-sm ">
          Don't have an account?
          <span className="ml-1  cursor-pointer font-semibold text-indigo-600" >
        <Link to="/login" className='text-[#c79324]'>Login</Link>
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register
