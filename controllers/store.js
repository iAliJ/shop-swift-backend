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
exports.store_edit_post = async (req, res) => {
    if(await hasPermission(req.user.id, req.body.id)) {
    console.log(`Editing store ${req.body.id}`);
    Store.findByIdAndUpdate(req.body.id, req.body, {new:true})
    .then((shop) => {
        res.json({shop});
    })
    .catch((err) => {
        console.log('An error occured while editing store');
        console.log(err);
        res.json({err});
    })}else{
        console.log(`user ${req.user.id} tried to edit a store ${req.body.id} which they dont own`);
        res.json({"message": "You dont have permission to perform this action"});
    }
}

// Delete store
exports.store_delete_get = async (req, res) => {
    if(await hasPermission(req.user.id, req.query.id)) {
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
    else{
        console.log(`user ${req.user.id} tried to delete a store ${req.query.id}`);
        res.json({"message": "You dont have permission to perform this action"});
    }
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

//#region helper functions
/**
 * Check if a specific user owns the permissions to edit or delete a store
 * @param {ID of the user} userId 
 * @param {ID of the store} storeId 
 */
async function hasPermission(userId, storeId) {
    const store = await Store.findById(storeId)
        if(store){
            return (store.user == userId);
        }
        return false;
}
//#endregion