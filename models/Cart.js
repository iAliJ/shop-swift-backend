const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "totalPrice": Number,
},
{
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;