const express = require('express');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const router  = express.Router();

const expressSession  = require('express-session');
const flash  = require('connect-flash');




require('dotenv').config();

const db =  require('./config/mongoose-connection');
const userRouter = require('./routes/userRouter');
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const homeRouter = require('./routes/app');
// const postModel = require('./models/post');
// const upload =  require('./config/multerconfig');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use (expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.EXPRESS_SESSION_SECRECT,
})
);

app.use (flash());





app.use('/user', userRouter);
app.use('/owner', ownerRouter);
app.use('/products', productRouter);
app.use('/', homeRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    );
});



