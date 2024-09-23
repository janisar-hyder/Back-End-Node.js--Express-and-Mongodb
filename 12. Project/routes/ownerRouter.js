const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');



if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {

        let owner = await ownerModel.find();

        if (owner.length > 0){
            return res
            .send(500)
            .send("something went wrong")
        }

        let { name, email , password}=req.body;
        let createdOwner = await ownerModel.create ({
            name,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
};


router.get('/admin', (req, res) => {
    res.render('createproducts');
});





module.exports = router;
