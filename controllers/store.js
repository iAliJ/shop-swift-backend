const Store = require('../models/Store');
const cloudUpload = require('../helper/cloudUploader');

// Create store
exports.store_create_post = async (req, res) => {
    // create store only if the seller doesnt have one
    const ownStore = await hasStore(req.body.user);
    if(!ownStore){
        console.log(`Creating new store by ${req.body.user}`);
        let store = new Store(req.body);
        store.save()
        .then((store) => {
            res.json({store});
        })
        .catch((err) => {
            console.log('Error creating new store');
            console.log(err);
            res.json({err}).status(400);
        })
    }
    else{
        res.json({'message': 'Error: You cannot create more stores'}).status(400);
    }
}

// Edit store
exports.store_edit_post = async (req, res) => {
    console.log('req.body inside controller:')
    console.log(req.body)
    // If requesy body is in text format, convert it to json
    // if(typeof req.body.store == 'string'){
    //     req.body = JSON.parse(req.body.store);
    // }
    console.log(`user ${req.user.id} is attempting to change store ${req.body._id}`);
    if(await hasPermission(req.user.id, req.body._id)) {
        // upload the image to the cloud
        if(req.file){
            const result = await cloudUpload.uploadSingle(req.file.path);
            req.body.logo = result.url;
        }
        console.log(`Editing store ${req.body._id}`);
        Store.findByIdAndUpdate(req.body._id, req.body, {new:true})
        .then((shop) => {
            console.log(`Editing store ${req.body._id} completed`);
            res.json({shop});
        })
        .catch((err) => {
            console.log('An error occured while editing store');
            console.log(err);
            res.json({err});
    })}
    else{
        console.log(`user ${req.user.id} tried to edit a store ${req.body._id} which they dont own`);
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

/**
 * Check if a user currently owns a store
 * @param {userId} userId 
 */
async function hasStore(userId) {
    try {
    const store = await Store.findOne({user: userId});
    if(store){
        console.log(store);
        return true;
    }}
    catch(err){
        console.log(err);
    }
    return false;
}
//#endregion