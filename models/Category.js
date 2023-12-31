const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;