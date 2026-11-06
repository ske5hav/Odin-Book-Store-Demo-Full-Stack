import {Pool} from 'pg'  //pool is use to connect to node js to postsql

import dotenv from 'dotenv' //impot to envible enboirment

dotenv.config() //new file defolut

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
pool.on("connect",()=>{
    console.log("Connected sucessfully");
    
})

pool.on("error",(err)=>{
    console.log("Unexpacted error",err)
})

export default pool