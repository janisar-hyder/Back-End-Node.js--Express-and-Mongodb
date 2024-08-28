const express = require('express')
const app = express()

// middleware
app.use(function(req, res, next){
    console.log('this is midllware 1');
    next();
});

app.use(function(req, res, next){
    console.log('this is midllware 2');
    next();
});



// making routes
app.get('/', function (req, res) {
  res.send('Hello World! kia hal hai')
});

app.get('/about', function (req, res, next) {
    return next(new Error("error"));
});



// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })



app.listen(3000)