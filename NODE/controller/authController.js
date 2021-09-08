const path = require('path');
const fs = require('fs');
const Student = require('../model/member')



exports.getLoginController = (req, res) => {
    res.render('login', {
        pageTitle: "Нэвтрэх хуудас"
    })
}

exports.postLoginController = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Student.findOne({email: email, password: password})
    .then(student => {
        if(student) {
            res.redirect(`/admin`)
        } else {
            res.redirect('/login')
        }
    })
}