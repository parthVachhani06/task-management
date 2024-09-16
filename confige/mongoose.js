const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/interviewbase2');
const db=mongoose.connection;

db.once('open',(err)=>{
    err?console.log("wronge items...."):console.log("db connected");
});

module.exports=db;
