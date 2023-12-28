const Store = require('../models/Store');

// Create store
exports.store_create_post = (req, res) => {
    console.log('Creating new store');
    let store = new Store(req.body);
    store.save()
    .then((store) => {
        res.json({store});
    })
    .catch((err) => {
        console.log('Error creating new store');
        console.log(err);
        res.send('Error creating new store');
    })
}