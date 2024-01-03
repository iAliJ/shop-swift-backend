const Order = require('../models/Order');

exports.order_create_get = async (req, res) => {
    console.log('Creating new order..')
    let order = new Order();
    order.user = req.user.id;
    order.cart = req.query.cart;
    order.save()
    .then(newOrder => {
        console.log(`new store created`);
        res.json({newOrder});
    })
    .catch(err => {
        console.log('Error creating new store');
        res.json(err).status(400);
    })
}

exports.order_detail_get = async (req, res) => {
    Order.findById(req.query.id)
    .then(order => {
        res.json({order});
    })
    .catch(err => {
        console.log('Error getting order details...');
        console.log(err);
    })
}

// Get orders by a specific user
exports.order_user_get = (req, res) => {
    Order.find({user: req.query.id})
    .populate('cart')
    .then(orders => {
        res.json({orders});
    })
    .catch(err => {
        console.log('Error fetching orders data for user ' + req.query.id);
        console.log(err);
    })
}