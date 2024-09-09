const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String

});

module.exports  = mongoose.model ('User', userSchema);

