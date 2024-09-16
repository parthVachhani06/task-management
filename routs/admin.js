const express=require('express');
const routs=express.Router();
const adminmodel=require('../model/Adminmodel');
const admincontroller=require('../controller/admincontroller');

routs.post('/addadmin',adminmodel.uploadimage,admincontroller.addadmin);
routs.get('/adminlogin',admincontroller.adminlogin);
routs.post('/adminupdate/:id',adminmodel.uploadimage,admincontroller.adminupdate);
routs.get('/admindelete/:id',admincontroller.admindelete);

routs.use('/managar',require('./manager'));
module.exports=routs;