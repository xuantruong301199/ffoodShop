const ObjectID = require('mongoose').Types.ObjectId;
const PRODUCT_COLL = require('../databases/product-coll');
const CATEGORY_COLL = require('../databases/category-coll');

module.exports = class product extends PRODUCT_COLL {

    static insert({ name, price, image, categoryID, description, store }) {
        return new Promise(async resolve => {
            try {

                if (!name || !price || !ObjectID.isValid(categoryID) || !ObjectID.isValid(store))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = {
                    name, image, price, category: categoryID, description, store
                }

                let infoAfterInsert = new PRODUCT_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                //Ham push id san pham vao danh sach san pham cua danh muc
                let result = await CATEGORY_COLL.findByIdAndUpdate(categoryID, { 
                    $addToSet: { products: infoAfterInsert._id }
                }, { new: true })

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoAfterInsert });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    //Lay tat ca san pham cua cua hang
    static getList({ storeID }) {
        return new Promise(async resolve => {
            try {
                let listProduct = await PRODUCT_COLL.find({ store: storeID });
                console.log({ listProduct });

                if (!listProduct) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listProduct });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    //Lay tat ca san pham cua danh muc
    static getListOfCategory({ categoryID }) {
        return new Promise(async resolve => {
            try {
                let listProductOfCategory = await PRODUCT_COLL.find({ category: categoryID });

                if (!listProductOfCategory) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listProductOfCategory });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ productID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(productID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoProd = await CATEGORY_COLL.findById(productID);

                if (!infoProd) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoProd });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ productID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(productID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await PRODUCT_COLL.findByIdAndDelete(productID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                //Ham push id san pham vao danh sach san pham cua danh muc
                let result = await CATEGORY_COLL.findByIdAndUpdate(infoAfterRemove.category, { 
                    $pull: { products: infoAfterRemove._id }
                }, { new: true })

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ name, image, price, productID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(productID))
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name, image, price
                }
                let infoAfterUpdate = await PRODUCT_COLL.findByIdAndUpdate(productID, dataUpdate, 
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