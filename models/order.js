const ObjectID = require('mongoose').Types.ObjectId;
const ORDER_COLL = require('../databases/order-coll');

module.exports = class order extends ORDER_COLL {

    static insert({ name, price, image, amount }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    name, image, price, amount
                }

                if (!name || !price || !amount)
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new ORDER_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();


                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList({ orderID }) {
        return new Promise(async resolve => {
            try {
                let listProduct = await ORDER_COLL.find({  orderID });

                if (!listProduct) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listProduct });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ orderID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(orderID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoProd = await ORDER_COLL.findById(orderID);

                if (!infoProd) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoProd });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({orderID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(orderID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await ORDER_COLL.findByIdAndDelete(orderID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });


                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ name, image, price, amount ,orderID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(orderID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name, image, price, amount
                }
                let infoAfterUpdate = await ORDER_COLL.findByIdAndUpdate(orderID, dataUpdate, 
                { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}