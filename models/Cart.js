const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "totalPrice": {
        type: Number,
        default: 0
    },
    "cartItems" : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
    }]
},
{
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;