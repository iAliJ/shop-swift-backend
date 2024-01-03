const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    "store": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "quantity": {
        type: Number,
        default: 0
    },
    "product": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    "status": {
        type: String,
        default: "pending"
    }
},
{
    timestamps: true
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;