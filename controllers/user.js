const User = require('../models/User');

exports.user_detail_get = (req, res) => {
    // get the user id
    User.findById(req.body.id)
    .then((user) => {
        console.log('Fetching user data..');
        // remove user password from the data do i need to remove the ID as well?
        user.password = '';
        res.json({user});
    })
    .catch((err) => {
        console.log('Error getting user data');
        console.log(err);
        res.json({'message': err.message}).status(404);
    })
}