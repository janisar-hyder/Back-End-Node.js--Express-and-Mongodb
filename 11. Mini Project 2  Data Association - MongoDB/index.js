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
app.post('/register', async (req, res) => {
    const { username, name, age, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send({ message: 'Email already exists' });
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






app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    );
});
