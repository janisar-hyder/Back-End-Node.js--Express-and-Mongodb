const express  = require('express');
const router  = express.Router();
const upload   = require('../config/multer-config');
const productModel = require('../models/product-model');


router.post('/create', upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        const newProduct = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
        req.flash("success", "Product Created")
        res.redirect("/owner/admin");

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});




module.exports = router;
