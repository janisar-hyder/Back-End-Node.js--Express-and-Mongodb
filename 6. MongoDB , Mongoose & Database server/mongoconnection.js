const moongoose  = require('mongoose');
moongoose.connect (`mongodb://localhost:27017/MyDB`);

const userSchema  = new moongoose.Schema({
    name: String,
    email: String,
    password: String
    });

const User = moongoose.model('User', userSchema);
module.exports  = User;

