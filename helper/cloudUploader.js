require('dotenv').config();
const cloudinary = require('cloudinary');
const fileServices = require('../services/fileServices');

module.exports = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path)
    .then(result => {
        req.body.logo = result.url;
        fileServices.removeFile(req.file.path);
        next();
    })
}