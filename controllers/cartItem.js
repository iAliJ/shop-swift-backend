const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.cartItem_update_post = async (req, res) => {
    // get product id from query {id}
    const productId = req.query.id;
    const qntity = req.query.qnt;
    // Get the cart from the user id 
    let cart = await Cart.findOne({user: req.user.id});
    const product = await Product.findById(productId);
    const totalPrice = calculatePrice(product.price, qntity);
    CartItem.findOneAndUpdate({cart: cart, product: product._id}, {
        "product": product._id,
        "cart": cart._id,
        "price": totalPrice,
        "quantity": req.query.qnt
    }, {
        new: true,
        upsert: true
    })
    .populate('product')
    .then(async (newCartItem) => {
        // Modify the total cart price
        console.log(cart);
        cart = await Cart.findOneAndUpdate({user: req.user.id}, {
            "totalPrice": cart.totalPrice + totalPrice
        });
        console.log(`new cart item created/updated with id: ${newCartItem._id} in cart ${cart._id}`);
        res.json({newCartItem});
    })
}

exports.cartItem_delete_get = async (req, res) => {
    // get the cart item from url
    const cartItemId = req.query.id;
    let cart = await Cart.findOne({user: req.user.id});
    console.log(`user ${req.user.id} attempting to delete cart item ${cartItemId}`);
    try{
        let cartItem = await CartItem.findById(cartItemId).populate('cart');
        // check if current user has permission to delete the cart item
        if(cartItem.cart.user == req.user.id) {
            // delete cart item
            CartItem.findByIdAndDelete(cartItemId)
            .then(async (item) => {
                console.log(`cart item ${cartItemId} deleted by ${req.user.id}`);
                // modify cart price
                cart = await Cart.findOneAndUpdate({user: req.user.id}, {
                    "totalPrice": cart.totalPrice - cartItem.price
                });
                res.json({item});
            })
            .catch((err) => {
                console.log('Error 01 deleting cart item');
                res.json({"message": err});
            })
        }else{
            console.log(`User ${req.user.id} attempted to delete an unauthorized cart item ${cartItemId}`);
        }
    }
    catch(err){
        console.log('Error 02 deleting cart item');
        console.log(err);
        res.json({"message": err});
    }
}

function calculatePrice(singleItem, quantity) {
    return singleItem * quantity;
}