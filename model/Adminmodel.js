const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const path = require('path');
const adminimagepath = "/upload/adminimage"

const adminschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    current_date: {
        type: String,
        required: true
    },
    update_date: {
        type: String,
        required: true
    },
    adminimage: {
        type: String,
        required: true
    }
});

const adminstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', adminimagepath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

adminschema.statics.uploadimage=multer({storage:adminstorage}).single('adminimage')
adminschema.statics.adminimgpath=adminimagepath;

const Admin=mongoose.model('adminmodel',adminschema);

module.exports=Admin;