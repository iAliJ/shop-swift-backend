const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.cart_items_get = async (req, res) => {
    // get the cart id owned by the user
    let cart = await Cart.findOne({user: req.user.id});
    // get all cart items owned by the cart
    CartItem.find({cart: cart._id})
    .populate('product')
    .then((cartItems) => {
        res.json({cartItems});
    })
}

exports.cart_detail_get = async (req, res) => {
    // get the cart id owned by the user
    try {
        let cart = await Cart.findOne({user: req.user.id});
        res.json({cart});
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}

exports.cart_empty_get = async (req, res) => {
    // get the cart owned by the current user
    let cart = await Cart.findOne({user: req.user.id})
    CartItem.deleteMany({cart: cart._id})
    .then((items) => {
        console.log(cart._id);
        Cart.findByIdAndUpdate(cart._id, {"totalPrice": 0}, {new: true});
        console.log(`user ${req.user.id} has deleted cart ${cart._id} items`)
        res.json({items});
    })
}

function calculatePrice(singleItem, quantity) {
    return singleItem * quantity;
}