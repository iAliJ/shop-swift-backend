const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "logo": String,
    "address": String,
    "category": {
        type: mongoose.Schema.Types.ObjectId
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamp: true
})

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;