const Student = require('../model/member');
const Article = require('../model/article');

exports.getAdminController = (req, res) => {
    res.render('admin', {
        pageTitle: 'Удирдах хэсэг'
    })
}