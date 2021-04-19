const ObjectID = require('mongoose').Types.ObjectId;
const STORE_COLL = require('../databases/store-coll');

module.exports = class store extends STORE_COLL {

    static insert({ name, address, hotline }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    name , address, hotline
                }

                if (!name , !address, !hotline )
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterInsert = new STORE_COLL(dataInsert);
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
                let listStore = await STORE_COLL.find({ store: storeID });

                if (!listStore) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listStore });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }
    static getInfo({  storeID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(storeID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoStore = await STORE_COLL.findById(storeID);

                if (!infoStore) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoStore });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static remove({ storeID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid( storeID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await STORE_COLL.findByIdAndDelete( storeID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ name , address, hotline, storeID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid( storeID)|| !name || !address || !hotline)
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name , address, hotline
                }
                let infoAfterUpdate = await STORE_COLL.findByIdAndUpdate(storeID, dataUpdate, 
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