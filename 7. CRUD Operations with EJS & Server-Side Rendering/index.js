const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const userModel = require('./model/user');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index')
});


app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
    let createduser = await userModel.create({
        name, 
        email, 
        image
    })
    res.redirect ('showuser');


})

app.get('/showuser', async (req, res) => {
    let users= await  userModel.find();
    res.render('showuser', {users})
});

app.get('/update/:uid', async (req, res) => {
    let euser= await  userModel.findOne({_id : req.params.uid});
    res.render ('update', {euser})
});

app.post('/update/:uid', async (req, res) => {
    let {name, email, image} = req.body;
    await  userModel.findOneAndUpdate({_id : req.params.uid},{name,email,image}, {new:true});
    res.redirect ('showuser');
})


app.get('/delete/:id', async (req, res) => {
    let users= await  userModel.findOneAndDelete({_id : req.params.id});
    res.redirect ('showuser');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




