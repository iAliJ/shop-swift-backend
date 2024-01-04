const Product = require('../models/Product');

// Create product
exports.product_create_post = (req, res) => {
    console.log('Creating new product');
    let product = new Product(req.body);
    product.save()
    .then((product) => {
        res.json({product});
    })
    .catch((err) => {
        console.log('Error creating new product');
        console.log(err);
        res.json({err});
    })
}

// Edit product
exports.product_edit_post = async (req, res) => {
    if(await hasPermission(req.user.id, req.body.id)) {
    console.log(`Editing product ${req.body.id}`);
    Product.findByIdAndUpdate(req.body.id, req.body, {new:true})
    .then((shop) => {
        res.json({shop});
    })
    .catch((err) => {
        console.log('An error occured while editing product');
        console.log(err);
        res.json({err});
    })}else{
        console.log(`user ${req.user.id} tried to edit a product ${req.body.id} which they dont own`);
        res.json({"message": "You dont have permission to perform this action"});
    }
}

// Delete product
exports.product_delete_get = async (req, res) => {
    if(await hasPermission(req.user.id, req.query.id)) {
        console.log(`Deleting product ${req.query.id}`);
        Product.findByIdAndDelete(req.query.id)
        .then((product) => {
            res.json({product});
        })
        .catch((err) => {
            console.log('An error occured while editing product');
            console.log(err);
            res.json({err});
        })
    }
    else{
        console.log(`user ${req.user.id} tried to delete a product ${req.query.id}`);
        res.json({"message": "You dont have permission to perform this action"});
    }
}

// Get all products
exports.product_getAll_get = (req, res) => {
    Product.find()
    .then((products) => {
        res.json({products});
    })
    .catch((err) => {
        console.log('Error getting all products')
        console.log(err);
        res.json({err});
    })
}

// Get one product
exports.product_detail_get = (req, res) => {
    Product.findById(req.query.id)
    .then((product) => {
        res.json({product});
    })
    .catch((err) => {
        console.log(`Error reading specific product data ${req.query.id}`);
        console.log(err);
        res.json({err});
    })
}


// Get all products by category
// exports.product_getByCategory_get = (req, res) => {
   

//     Product.findById( req.query.id )
//         .then((products) => {
//             res.json({ products });
//         })
//         .catch((err) => {
//             console.log('Error getting products by category');
//             console.log(err);
//             res.json({ err });
//         });
// };

// Get all products by category
exports.product_getByCategory_get = (req, res) => {
    const categoryId = req.query.id;

    // // Check if categoryId is provided
    // if (!categoryId) {
    //     return res.status(400).json({ message: "Category ID is required." });
    // }

    Product.find({ category: categoryId })
        .then((products) => {
            res.json({ products });
        })
        .catch((err) => {
            console.log('Error getting products by category');
            console.log(err);
            res.json({ err });
        });
};




//#region helper functions
/**
 * Check if a specific user owns the permissions to edit or delete a product
 * @param {ID of the user} userId 
 * @param {ID of the product} productId 
 */
async function hasPermission(userId, productId) {
    const product = await Product.findById(productId)
        if(product){
            return (product.user == userId);
        }
        return false;
}
//#endregion


// search from 
// req.


exports.search_index_post = (req, res) => {
    let searchTerm = req.body.searchTerm;
    const query = { "name": { "$regex": searchTerm, "$options": "i" } };
    Shop.find(query)
    .populate('mall')
    .then((shops) => {
        res.render('search/index', {shops});
    });
}