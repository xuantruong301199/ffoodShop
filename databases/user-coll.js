const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({

    fullname: String,

    email: String,

    password: String,

    phone: String,

    birthday: String,

    province: String,

    district: String,

    image:  String,

    store: {
        type: Schema.Types.ObjectId,
        ref: "store",
    },

    role: { type: Number, default: 0},
});

const USER_MODEL = mongoose.model('user', UserSchema);
module.exports  = USER_MODEL;