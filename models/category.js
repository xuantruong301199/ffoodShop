const ObjectID = require('mongoose').Types.ObjectId;
const CATEGORY_COLL = require('../databases/category-coll');
const PRODUCT_COLL = require('../databases/product-coll');

module.exports = class category extends CATEGORY_COLL {

    static insert({ name, image, storeID }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    name, image, store: storeID
                }

                if (!name || !ObjectID.isValid(storeID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new CATEGORY_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList({ storeID }) {
        return new Promise(async resolve => {
            try {
                let listCategory = await CATEGORY_COLL.find({ store: storeID });

                if (!listCategory) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listCategory });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ categoryID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(categoryID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoCategory = await CATEGORY_COLL.findById(categoryID);

                if (!infoCategory) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoCategory });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ categoryID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(categoryID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await CATEGORY_COLL.findByIdAndDelete(categoryID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                let removeAllProductOfCategory = await PRODUCT_COLL.deleteMany({ category: categoryID })

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ name, image, categoryID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(categoryID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name, image
                }
                let infoAfterUpdate = await CATEGORY_COLL.findByIdAndUpdate(categoryID, dataUpdate, 
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