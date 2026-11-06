import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from "../config/db.js"

import { protect } from '../middleware/auth.js'
const router = express.Router()
//cookioprion to save data in broser in what day 
const cookioption ={
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:'Strict',
    maxAge:30*24*60*60*1000 
}
//getratoken it a rember to just login yor cokke in 30 days 
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET ,{
        expiresIn:'30d'
    })
}

//riseter
router.post('/register',async (req ,res) =>{
    //give a daya from risrer from data 
    const {name ,email ,password} =req.body
    if(!name || !email || !password){
        return  res.status(400).json({massage:'Plese provide all  requrment'})

    }
    //userExists fine the maile complasery from rester from and fien data base
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1',[email])
    //Not data found 
    if(userExists.rows.length > 0){
        return res.status(400).json({massage:'user alrady exists'})
    }
    //using bcrypt to satorn youe password
    const hashedPassword =await bcrypt.hash(password,10)
    //newuser contain to and inser to DATABASE QUERY 
       //(username,email,password) ad palsed in($1 , $2 , $3)
          //retrunin  omayl id ,emaile ,username
    const newuser = await pool.query(
        'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email',
        [name ,email ,hashedPassword]

    )
   
    //this is token token stroe funtion in gettoekn curran user andfeusres many users

    const token =generateToken(newuser.rows[0].id)
     //save cookie in cokkie funtion
    res.cookie('token',token,cookioption)
    //return user dtata
    return res.status(201).json({ user : newuser.rows[0] })

    
})


//login
router.post('/login',async(req,res) =>{
    //only need to email and pass word to your login process
    const {email ,password} = req.body;
    //yse and no 
    if(!email || !password){
       return res.status(400).json({
    message: 'Please provide email and password'
})

    }
     //same fiend out to eamle varficrion in  looks sing
     const user= await pool.query('SELECT *FROM users WHERE email=$1',[email])
     //miide error handler  
     if(user.rows.length === 0){
        return res.status(400).json({massage:'invalide co'})
     }
      //store to data bas data 
      const userData = user.rows[0]
      //matching to user data and data base data
      const isMatch = await bcrypt.compare(password,userData.password)
      //yes no error handler
      if(!isMatch){
        return res.status(400).json({massage:'invalid'})

      }
      //same process to register
      const token = generateToken(userData.id)
      //stroe toekn
      res.cookie('token',token,cookioption)
      //store only this data 
      res.json({user :{
        id:userData.id,
        name:userData.name,
        email:userData.email
      }})
})
//me 
   // this is a middleware
router.get('/me', protect , async (req,res) =>{
    res.json(req.user)
})

//logout
  //process of logout 
router.post('/logout',(req,res)=>{
    //cookie sore to  oly 1mili sec and shoudoue your site go home cookie distro
  res.cookie('token',"",{...cookioption,maxAge:1})

  res.json({massage:'Logoutsucess fully'})
})

//this is immport to use
export default router