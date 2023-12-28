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
        res.json({err});
    })
}

// Edit store
exports.store_edit_post = (req, res) => {
    console.log(`Editing store ${req.body.id}`);
    Store.findByIdAndUpdate(req.body._id, req.body, {new:true})
    .then((shop) => {
        res.json({shop});
    })
    .catch((err) => {
        console.log('An error occured while editing store');
        console.log(err);
        res.json({err});
    })
}

// Delete store
exports.store_delete_get = (req, res) => {
    console.log(`Deleting store ${req.query.id}`);
    Store.findByIdAndDelete(req.query.id)
    .then((store) => {
        res.json({store});
    })
    .catch((err) => {
        console.log('An error occured while editing store');
        console.log(err);
        res.json({err});
    })
}

// Get all stores
exports.store_getAll_get = (req, res) => {
    Store.find()
    .then((stores) => {
        res.json({stores});
    })
    .catch((err) => {
        console.log('Error getting all stores')
        console.log(err);
        res.json({err});
    })

}

// Get one store
exports.store_detail_get = (req, res) => {
    Store.findById(req.query.id)
    .then((store) => {
        res.json({store});
    })
    .catch((err) => {
        console.log(`Error reading specific store data ${req.query.id}`);
        console.log(err);
        res.json({err});
    })

}