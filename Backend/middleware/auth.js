import jwt from 'jsonwebtoken'
import pool from '../config/db.js'


export  const protect = async (req,res,next) => {
    try{
     const token = req.cookies.token
      if(!token){
        return res.status(401).json({massage : "not authorise not token"})
      }
      const  decode= jwt.verify(token,process.env.JWT_SECRET)
      const user=await pool.query("SELCET id,name,email from WHERE id=$1",[decode.id])
      if (user.rows.length === 0){
        return res.status(401).json({massage: "mot user found"})
      }

      req.user =user.rows[0]
      next()

    }catch(error){
      console.log(error)
      res.status(401).json({massage: "Not autorized ,token failde"})
    }
}
