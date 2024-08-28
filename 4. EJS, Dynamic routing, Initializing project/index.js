const express = require ('express');
const app = express();
const path = require ('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// app.get('/profile/hyder', function(req, res) {
//     res.render("index")
// });


app.get('/profile/:username', function(req, res) {
    res.send(`Welcome Mr. ${req.params.username}`)
});

app.get('/profile/:username/:email', function(req, res) {
    res.send(`Welcome Mr. ${req.params.username}, Your email is ${req.params.email}`)
});



app.listen(3000, function(){
    console.log("local host is running");
    
})
