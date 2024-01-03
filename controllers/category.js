const Category = require('../models/Category');

// Create Category

exports.category_create_post = (req, res) => {
    console.log('Creating new category');
    let category = new Category(req.body);
    category.save()
    .then((category) => {
        res.json({category});
    })
    .catch((err) => {
        console.log('Error creating new category');
        console.log(err);
        res.json({err});
    })
}


// Edit category
exports.category_edit_post = async (req, res) => {
    if(await hasPermission(req.user.id, req.body.id)) {
    console.log(`Editing category ${req.body.id}`);
    Category.findByIdAndUpdate(req.body.id, req.body, {new:true})
    .then((shop) => {
        res.json({shop});
    })
    .catch((err) => {
        console.log('An error occured while editing category');
        console.log(err);
        res.json({err});
    })}else{
        console.log(`user ${req.user.id} tried to edit a category ${req.body.id} which they dont own`);
        res.json({"message": "You dont have permission to perform this action"});
    }
}

// Delete category
exports.category_delete_get = async (req, res) => {
    if(await hasPermission(req.user.id, req.query.id)) {
        console.log(`Deleting category ${req.query.id}`);
        Category.findByIdAndDelete(req.query.id)
        .then((category) => {
            res.json({category});
        })
        .catch((err) => {
            console.log('An error occured while editing category');
            console.log(err);
            res.json({err});
        })
    }
    else{
        console.log(`user ${req.user.id} tried to delete a category ${req.query.id}`);
        res.json({"message": "You dont have permission to perform this action"});
    }
}

// Get all categorys
exports.category_getAll_get = (req, res) => {
    Category.find()
    .then((categories) => {
        res.json({categories});
    })
    .catch((err) => {
        console.log('Error getting all categorys')
        console.log(err);
        res.json({err});
    })
}

// Get one category
exports.category_detail_get = (req, res) => {
    Category.findById(req.query.id)
    .then((category) => {
        res.json({category});
    })
    .catch((err) => {
        console.log(`Error reading specific category data ${req.query.id}`);
        console.log(err);
        res.json({err});
    })
}

//#region helper functions
/**
 * Check if a specific user owns the permissions to edit or delete a category
 * @param {ID of the user} userId 
 * @param {ID of the category} categoryId 
 */
async function hasPermission(userId, categoryId) {
    const category = await Category.findById(categoryId)
        if(category){
            console.log("Checking permission")
            console.log(category);
            return (category.user == userId);
        }
        return false;
}
//#endregion