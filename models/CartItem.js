const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    "product": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    "cart": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    "price": Number,
    "quantity": Number,
},
{
    timestamps: true
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;