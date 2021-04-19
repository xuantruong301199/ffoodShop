const ObjectID = require('mongoose').Types.ObjectId;
const USER_COLL = require('../databases/user-coll');
const { hash, compare } = require('bcryptjs');
const { sign, verify } = require('../utils/jwt');

module.exports = class user extends USER_COLL {
    static register({ email, password, fullname }) {
        return new Promise(async resolve => {
            try {
                let checkExist = await USER_COLL.findOne({ email });
                if (checkExist)
                    return resolve({ error: true, message: 'email_existed' });
                let hashPassword = await hash(password, 8);
                let newUser = new USER_COLL({ fullname, email, password: hashPassword});
                let infoUser = await newUser.save();
                console.log({ infoUser })
                if (!infoUser) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoUser });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static signIn({ email, password }) {
        return new Promise(async resolve => {
            try {
                console.log(email, password);
                // tim user trong he thong
                const infoUser = await USER_COLL.findOne({ email });
                if (!infoUser)
                    return resolve({ error: true, message: 'email_not_exist' });
                const checkPass = await compare(password, infoUser.password);
                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });
                await delete infoUser.password;
                let token = await sign({ data: infoUser });
                return resolve({ error: false, data: { infoUser, token } });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listUser = await USER_COLL.find();
                return resolve({ error: false, data: listUser });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getInfo({ userID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoUser = await USER_COLL.findById(userID);

                if (!infoUser) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoUser });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static remove({ userID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid( userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await USER_COLL.findByIdAndDelete( userID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static update({ fullname, email, phone, birthday, province, district, image, userID }) {
        return new Promise(async resolve => {
            try {

                if (!fullname)
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    fullname, email, phone, birthday, province, district, image
                }
                let infoAfterUpdate = await USER_COLL.findByIdAndUpdate(userID, dataUpdate, 
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
