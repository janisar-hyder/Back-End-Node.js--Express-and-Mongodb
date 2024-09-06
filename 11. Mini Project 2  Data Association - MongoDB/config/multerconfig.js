const multer = require('multer');
const crypto = require('crypto');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgs/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, hash) => {
            const filename = hash.toString('hex') + path.extname(file.originalname);
            cb(null, filename)
        })
    }
})

const upload = multer({ storage: storage })
module.exports  = upload;
