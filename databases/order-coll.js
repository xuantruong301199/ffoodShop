const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const OrderSchema = new Schema({

    name: String,

    price: String,

    amount: String,
    
   /* products: [{
        type: Schema.Types.ObjectId,
        ref: "product",
    }], */

    image: String,
    
   
});

const ORDER_MODEL = mongoose.model('order', OrderSchema);
module.exports  = ORDER_MODEL;