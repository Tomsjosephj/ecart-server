 //load env file to process env
 require('dotenv').config()

 const express =require('express')

 const cors=require('cors')

 const server= express()

 //import connection.js file

 require("./db/connection")

 //import router file

 const router= require('./routes/router')

 //eg of application specific middleware

 server.use(cors())

 server.use(express.json())

 server.use(router)

 const port=process.env.port || 3000

 //api test

 server.get("/",(req,res)=>{

    res.status(200).json("server started")

 })
 
 //run server app

 server.listen(port,()=>{
    console.log(`Ecart started at port: ${port}`);
 })



