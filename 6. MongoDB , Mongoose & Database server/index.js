const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./mongoconnection');


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: 'Janisar',
        email: 'janisarhyder90@gmail.com',
        password: '123456'

    })
    res.send(createduser);

});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.send(users);
});

app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({ name: 'Hyder' }, { name: 'janisar' });
    res.send(updateduser);
});

app.get('/delete', async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({ name: 'janisar' });
    res.send(deleteduser);
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


