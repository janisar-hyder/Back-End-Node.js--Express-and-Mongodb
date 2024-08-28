const express = require('express');
const app = express();
// let bcrypt = require('bcryptjs');
const port = 3000;
let jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get("/", function(req, res){
    let token = jwt.sign({ email: 'janisarhyder@gmail,com' }, 'secret');
    res.cookie("token", token)
    res.send("done")
})


app.get("/verify", function(req, res){
    let data = jwt.verify(req.cookies.token, 'secret');
    res.send(data)
    
})






// Bcrypt method

// let name = "janisar"
// let ename = ""
// app.get("/", function (req, res) {
    
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(name, salt, function (err, hash) {
//             ename = hash;
//             res.send("Hi")
//         });
//     });

//     bcrypt.compare(name, ename, function (err, res) {
//         console.log(res);
//     });

// });



app.listen(port);