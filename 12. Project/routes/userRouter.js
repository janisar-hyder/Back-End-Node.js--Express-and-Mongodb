const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/authControler')



router.get('/', (req, res) => {
    res.send('Hello to User');
});

router.post('/register', registerUser );


module.exports = router;
