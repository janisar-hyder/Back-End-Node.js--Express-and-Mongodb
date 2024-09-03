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

app.get('/profile', isLogedIn , (req, res) => {
    res.send(req.user)
});


app.get('/logout', (req, res) => {
    res.cookie ('token', "");
    res.redirect('/login')
});


app.post('/register', async (req, res) => {

    const { username, name, age, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send("Email already exists");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            let user = userModel.create({ 
                username, name, age, email, password: hash 
            });

            let token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie ('token', token);
            res.send("Registered");

        });
    });
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send('Something went wrong!');

    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie ('token', token);
            res.status(200).send("Loged In Successfully");
        } 
        else res.redirect('/login');
    });
    
});


function isLogedIn(req, res, next){
    if(req.cookies.token === "") res.send("You need to login first");
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
