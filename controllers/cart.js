const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.cart_detail_get = async (req, res) => {
    // get the cart id owned by the user
    let cart = await Cart.findOne({user: req.user.id});
    // get all cart items owned by the cart
    CartItem.find({cart: cart._id})
    .populate('product')
    .then((cartItems) => {
        res.json({cartItems});
    })
}

function calculatePrice(singleItem, quantity) {
    return singleItem * quantity;
}