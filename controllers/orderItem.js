const OrderItem = require('../models/OrderItem');

// Create store
exports.orderItem_create_post = async (req, res) => {
    let orderItem = new OrderItem(req.body)
    orderItem.save()
    .then(orderItem => {
        res.json({orderItem});
    })
    .catch(err => {
        console.log("Error creating order item");
        console.log(err);
        res.json(err).status(400);
    })
}

exports.orderItem_getByStore_get = (req, res) => {
    OrderItem.find({store: req.query.id})
    .populate('product')
    .then(orderItems => {
        res.json({orderItems})
    })
    .catch(err => {
        console.log("Error getting order items");
        console.log(err);
        res.json(err).status(400);
    })
}