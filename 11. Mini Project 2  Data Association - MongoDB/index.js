const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/profile', isLogedIn , async (req, res) => {
    let user = await userModel.findOne({email:  req.user.email}).populate("post");
    res.render('profile', {user})
});

app.get('/like/:id', isLogedIn , async (req, res) => {
    let postId = req.params.id.trim(); 
    let post = await postModel.findOne({_id: postId}).populate("user");
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    
    await post.save();
    res.redirect('/profile');
});

app.get('/edit/:id', isLogedIn , async (req, res) => {
    let pId = req.params.id.trim(); 
    let post = await postModel.findOne({_id: pId}).populate("user");
    res.render('edit', {post});
});

app.post('/update/:id', isLogedIn , async (req, res) => {
    let pId = req.params.id.trim(); 
    let post = await postModel.findOneAndUpdate({_id: pId}, {content : req.body.content});
    res.redirect('/profile');
});



app.get('/logout', (req, res) => {
    res.cookie ('token', "");
    res.redirect('/login')
});


app.post('/register', async (req, res) => {

    const { username, name, age, email, password, image } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("Email already exists");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            let user = userModel.create({ 
                username, name, age, email, password: hash, image
            });

            let token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie ('token', token);
            res.redirect('/profile');

        });
    });
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).send('<script>alert("Email or Password in incorrect"); window.location.href="/login";</script>');
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie('token', token);
            res.redirect('/profile');
        } 
        else res.status(400).send('<script>alert("Email or Password in incorrect"); window.location.href="/login";</script>');
    });
    
});

app.post('/post', isLogedIn , async (req, res) => {
    let user = await userModel.findOne({email:  req.user.email});
    let {content} =  req.body;

    let post = await postModel.create ({ 
        user: user._id,
        content
        });
    user.post.push (post._id);
    await user.save();
    res.redirect('/profile');
 
});



function isLogedIn(req, res, next){
    if(req.cookies.token === "") res.redirect("login");
    else{
        let data = jwt.verify(req.cookies.token, 'shhhhh');
        req.user = data;
    }
    next();
};



app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    );
});
