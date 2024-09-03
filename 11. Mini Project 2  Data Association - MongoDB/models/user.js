// setup mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyDB')
// make userschema and export it
const userSchema = new mongoose.Schema({
    username:  String,
    name: String,
    age:  Number,
    email: String,
    password: String,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})
const user = mongoose.model('user', userSchema);
module.exports = (user);

