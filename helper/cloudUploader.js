require('dotenv').config();
const cloudinary = require('cloudinary');
const fileServices = require('../services/fileServices');

// exports.uploadFile = (field) => {
//     return (req, res, next) => {
//         cloudinary.uploader.upload(req.file.path)
//         .then(result => {
//             req.body[field] = result.url;
//             fileServices.removeFile(req.file.path);
//             next();
//         })
//     }
// }

exports.uploadSingle = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath);
    fileServices.removeFile(filePath);
    return result;
}