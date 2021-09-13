const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arcticaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('arctice', arcticaSchema)