const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async function (req, res) {

    try {
        let { fullname, email, password } = req.body;
        
        let user = await userModel.findOne({ email: email });
        if  (user) return res.status(401).send("You already have an account");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user);

                    res.cookie('token', token);
                    res.send("user Created")


                }

            });
        });


    } catch (err) {
        res.send(err.message);
    }

}