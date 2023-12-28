const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.user.id)
    .then((user) => {
        let role = user.role;
        if(role == 'seller'){
            next()
        }else{
            return res.status(403).json({'message': 'Access denied'});
        }
    });
}