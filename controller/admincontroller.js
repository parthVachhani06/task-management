const adminmodel = require('../model/Adminmodel');
const session = require('express-session')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

module.exports.addadmin = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    
    let chekmail = await adminmodel.findOne({ email: req.body.email });
    if (!chekmail) {
        if (req.body.password === req.body.cpassword) {
            let adminimgpath = "";
            if (req.file) {
                adminimgpath = adminmodel.adminimgpath + "/" + req.file.filename;
            }
            req.body.adminimage = adminimgpath
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.current_date = new Date().toLocaleString();
            req.body.update_date = new Date().toLocaleString();
            req.body.status = true;
            let admindata = await adminmodel.create(req.body);
            if (admindata) {
                return res.status(200).json({ msg: "admindata insert successfully", status: 1, rec: admindata })
            }
            else {
                return res.status(400).json({ msg: "admindata not insert", status: 0 })
            }
        }
        else {
            return res.status(400).json({ msg: "password and confirm password are not match", status: 0 })
        }
    }
    else {
        return res.status(400).json({ msg: "email already exisct", status: 0 })
    }
}

module.exports.adminlogin = async (req, res) => {
    // console.log(req.body);
    let chekmail = await adminmodel.findOne({ email: req.body.email });
    if (chekmail) {
        if (await bcrypt.compare(req.body.password, chekmail.password)) {
            let token = await jwt.sign({ data: chekmail }, "right", { expiresIn: "1hr" });
            return res.status(200).json({ msg: "admin login successfully", status: 1, rec: chekmail, token });
        }
        else {
            return res.status(400).json({ msg: "passport not match", status: 0 });
        }
    }
    else {
        return res.status(400).json({ msg: "email not match", status: 0 });
    }
}

module.exports.adminupdate = async (req, res) => {

    try {
        if (req.file) {
            let olddata = await adminmodel.findById(req.params.id);
            if (olddata.adminimage) {
                let oldimagepath = path.join(__dirname, '..', olddata.adminimage);
                await fs.unlinkSync(oldimagepath);
            }
            let newimgpth = adminmodel.adminimgpath + "/" + req.file.filename;
            req.body.adminimage = newimgpth
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.current_date = new Date().toLocaleString();
            req.body.update_date = new Date().toLocaleString();
            req.body.status = true;
            let admindata = await adminmodel.findByIdAndUpdate(req.params.id, req.body);
            if (admindata) {
                return res.status(200).json({ msg: "admin data and image update successfully", status: 1, rec: admindata });
            }
            else {
                return res.status(400).json({ msg: "admin data and image not update", status: 0 });
            }
        }
        else {
            let olddata = await adminmodel.findById(req.params.id);
            if (olddata.adminimage) {
                req.body.adminimage = olddata.adminimage;
                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.current_date = new Date().toLocaleString();
                req.body.update_date = new Date().toLocaleString();
                req.body.status = true;

                let admindata = await adminmodel.findByIdAndUpdate(req.params.id, req.body);
                if (admindata) {
                    return res.status(200).json({ msg: "admin data update successfully", status: 1, rec: admindata });
                }
                else {
                    return res.status(400).json({ msg: "admin data not update", status: 0 });
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "something wronge", status: 0, rec: err });
    }
}

module.exports.admindelete = async (req, res) => {
    try {
        if (req.params.id) {
            let olddata = await adminmodel.findById(req.params.id);
            if (olddata.adminimage) {
                let oldimagepath = path.join(__dirname, '..', olddata.adminimage);
                await fs.unlinkSync(oldimagepath);
            }
            let admindata = await adminmodel.findByIdAndDelete(req.params.id);
            if (admindata) {
                return res.status(200).json({ msg: "admin data delete successfully", status: 1, rec: admindata });
            }
            else {
                return res.status(400).json({ msg: "admin data not delete ", status: 0, rec: err });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "something wronge", status: 0, rec: err });
    }
}