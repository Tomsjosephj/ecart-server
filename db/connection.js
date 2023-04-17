//define connection between node and mongodb using mongoose

const mongoose= require("mongoose")

//get connection string from env

const db= process.env.database

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true

}).then(()=>{
    console.log("cart database connected sussesfully");
}).catch(()=>{
    console.log("error");
})

