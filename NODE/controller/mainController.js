const path = require('path');
const fs = require('fs');
const Student = require('../model/member');


exports.homeController = (req, res) => {
    Student.find()
    .then(students => {
        res.render('main', {
            pageTitle: "users",
            users: students
        })
    })
}

exports.loginContoller = (req, res) => {
    res.render('index', {
        pageTitle: "users",
        users: objectData
    });
}

exports.userController = (req, res) => {
    const userId = req.params.id;
    Student.findOne({_id: userId})
    .then(student => {
        console.log(student)
        res.render('account', {
            pageTitle: 'loggedUser.name',
            user: student
        })
    })
}

exports.getRegisterController = (req, res) => {
    res.render('signup', {
        pageTitle: "Бүртгэл"
    })
}

exports.postRegisterController = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const avatar = req.body.avatar;

    const user = new Student({
        name: username,
        password: password,
        number: number,
        email: email,
        avatar: avatar
    })

    user.save()
    .then(result => {
        res.redirect('/')
    })
}


exports.getEditController = (req, res) => {
    const userId = req.params.id;
    Student.findById(userId)
    .then(student => {
        res.render('edit', {
            pageTitle: "Засах",
            user: student
        })
    })
}

exports.postEditController = (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const avatar = req.body.avatar;

    Student.findById(userId)
    .then(student => {
        student.name = username;
        student.password = password;
        student.number = number;
        student.email = email;
        student.avatar = avatar;
        return student.save()
    })
    .then(result => {
       res.redirect(`/user/${result._id}`)
    })
}


exports.postDeleteController = (req, res) => {
    const userId = req.body.userId;
    Student.findOne({id: userId})
    .then(student => {
        return student.delete();
    })
    res.redirect('/')
}

exports.getAdminController = (req, res) => {
    Student.find()
    .then(student => {
        res.render('admin', {
            pageTitle: "Admin",
            users: student
        })
    })
}