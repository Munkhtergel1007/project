const path = require('path');
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose')
const cp = require('cookie-parser')
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)

const mainRouter = require('./router/mainRouter');
const authRouter = require('./router/auth');
const adminRouter = require('./router/adminRouter');

const Student = require('./model/member');

const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');
const store = new MongoSession({
    uri: 'mongodb://127.0.0.1:27017/academy',
    collection: "session"
})


app.use(bp.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: store
}))



app.use((req, res, next) => {
    if(!req.session.user){
        return next();
    } 
    Student.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
})
app.use(cp())


app.use(authRouter);
app.use(mainRouter);
app.use(adminRouter);

app.use((req, res) => {
    res.status(404).render('404', {
        pageTitle: '404 - Page not Found'
    })
})


mongoose.connect('mongodb://127.0.0.1:27017/academy')
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))


