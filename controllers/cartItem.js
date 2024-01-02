const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.cartItem_update_post = async (req, res) => {
    // get product id from query {id}
    const productId = req.query.id;
    const qntity = req.query.qnt;
    // Get the cart from the user id 
    const cart = await Cart.find({user: req.user.id});
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
    .then((newCartItem) => {
        console.log(`new cart item created with id: ${newCartItem._id}`);
        res.json({newCartItem});
    })
}

function calculatePrice(singleItem, quantity) {
    return singleItem * quantity;
}