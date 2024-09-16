const mongoose = require('mongoose');


const managarschema = mongoose.Schema({
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
    }
});


const managar=mongoose.model('managarmodel',managarschema);

module.exports=managar;