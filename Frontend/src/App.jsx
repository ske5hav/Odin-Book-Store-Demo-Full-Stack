import React from 'react'
import { useState } from 'react'
import {BrowserRouter as Router ,Routes ,Route ,Navigate} from "react-router-dom"
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import axios from 'axios' 

axios.defaults.withCredentials = true

const App = () => {
  const [user,setUser]=useState(null)
  const [error,setError]=useState()
  const [loding,setLoding]=useState(true)

  //api
  useEffect(()=>{
    const fetchUser = async ()=>{
      try{
        const res =await axios.get("http://localhost:5000/api/auth/me",{ withCredentials: true })
        setUser(res.data)
      }catch(error){
        setUser(null)
        console.log("setuseer")
      }finally{
        setLoding(false)
      }
    }
    fetchUser()
  },[])
  if(loding){
    return <div>Loding...</div>
  }
 
  return (
    <Router>
      <Navbar  user={user} setUser={setUser}/>
       <Routes>
        <Route path="/" element={<Home  user={user} error={error}/>}/>
        <Route path="/login" element={<Login   setUser={setUser}/>}/>
        <Route path="/register" element={<Register  setUser={setUser}/>}/>
        <Route path="/dashboard" element={user ? <h1>Dashbord</h1> : <h1>lol</h1>}/>
       </Routes>
    </Router>
  )
}

export default App
