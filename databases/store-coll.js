const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const StoreSchema = new Schema({

    name: String,

    address: String,

    hotline: String,

});

const STORE_MODEL = mongoose.model('store', StoreSchema);
module.exports  = STORE_MODEL;
