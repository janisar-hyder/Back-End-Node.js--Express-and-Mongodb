const express = require('express');
const app = express();
const userModel =  require('./models/user');
const postModel =  require('./models/post');
const user = require('./models/user');



const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/create', async (req, res) => {
    const user = await userModel.create({
        username :  'janisar',
        email : 'janisar@gmail.com',
        age: 21
    });
    res.send(user);
});

app.get('/post/create', async (req, res) => {

    const post = await postModel.create({
        postdata :  'janisar is a good boy',
        user : "66cef376e98125c47f7b3ef7",
    });

    let user =  await userModel.findOne({_id : "66cef376e98125c47f7b3ef7"});
    user.posts.push(post._id);
    await user.save();

    res.send({user, post})
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


