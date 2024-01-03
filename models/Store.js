const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "logo": String,
    "address": String,
    "description": {
        type: String,
        required: true
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },"product":[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
},
{
    timestamps: true
})

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;