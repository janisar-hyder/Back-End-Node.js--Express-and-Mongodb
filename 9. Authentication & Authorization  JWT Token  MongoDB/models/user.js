// setting up mongodb
const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testinauthen');

const userSchema =  new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    age :  Number
})
const User = mongoose.model('User', userSchema);
module.exports = User;








