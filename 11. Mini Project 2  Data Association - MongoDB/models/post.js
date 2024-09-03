// setup mongodb
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    content: String,
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, ref: 'user' 
        }
    ]
})
const post = mongoose.model('post', postSchema);
module.exports = (post);

