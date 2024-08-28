const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

const userModel = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieparser());


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("<script>alert('Invalid email or password'); window.location.href='/login';</script>");
    }

    bcrypt.compare(req.body.password, user.password, function(err, result){
        if (result) {

            const token = jwt.sign({ email: user.email }, 'hahaha');
            res.cookie('token', token);

            res.send("<script>alert('Login successful'); window.location.href='/login';</script>");
            
        } else {
            return res.status(400).send("<script>alert('Invalid email or password'); window.location.href='/login';</script>");
        }
    });
});


// making post request to create user

app.post('/create', (req, res) => {
    const { name, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const createduser = await userModel.create({
                name,
                email,
                password: hash,
                age
            });

            const token = jwt.sign({ email }, 'hahaha');
            res.cookie('token', token);

            res.send(createduser);
        });
    });

});


app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/')
});

app.listen(port);
