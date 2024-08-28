const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/DataAssociation");
const userSchema = new mongoose.Schema({
    usermame: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

const user = mongoose.model('user', userSchema);
module.exports = (user);

