const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    "cart": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "status": {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;