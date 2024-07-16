const multer = require("multer");
const fs = require('fs')
const path = require('path')
const {generateRandomString}= require('../utilities/helper')

const setPath = (uploadDir) =>{
    return( req, res, next)=>{
        req.uploadDir = uploadDir;
        next();
    }
};

const myStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        const uploadPath = path.join(__dirname, "../../public/uploads", req.uploadDir);
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{
                recursive:true
            });
        }
        cb(null, uploadPath);
    },
    filename:(req, file, cb)=>{
        const ext = file.originalname.split('.').pop();
        const filename = `${Date.now()}_${generateRandomString(10)}.${ext}`;
        cb(null, filename)
    }
})


const imageFilter = (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const allowed = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'bmp'];
    if (allowed.includes(ext.toLowerCase())) {
        cb(null, true);
    } else {
        cb({ code: 400, message: 'Image format not supported' });
    }
};

const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 3000000
    }
});

module.exports = {
    uploader,
    setPath
};
