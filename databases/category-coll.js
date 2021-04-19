const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CategorySchema = new Schema({

    name: String,
    
    products: [{
        type: Schema.Types.ObjectId,
        ref: "product",
    }],

    image: String,
    
    /**
     * 0: Dong lai
     * 1: Dang hoat dong
     */
    status: {
        type: Number,
        default: 1,
    },

    store: {
        type: Schema.Types.ObjectId,
        ref: "store",
    },

});

const CATEGORY_MODEL = mongoose.model('category', CategorySchema);
module.exports  = CATEGORY_MODEL;