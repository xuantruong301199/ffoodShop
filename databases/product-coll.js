const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({

    name: String,

    price: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },

    image: String,

    description: String,

    store: {
        type: Schema.Types.ObjectId,
        ref: "store",
    }
});
const PRODUCT_MODEL = mongoose.model('product', ProductSchema);
module.exports  = PRODUCT_MODEL;