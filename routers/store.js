const route             = require('express').Router();
const STORE_MODEL       = require('../models/store');

route.post('/add-store', async (req, res) => {
    let { name, address, hotline } = req.body;
    let infoStoreAfterInsert = await STORE_MODEL.insert({ name, address, hotline });
    console.log({ infoStoreAfterInsert })
    return res.json(infoStoreAfterInsert);
})

route.post('/info-store', async (req, res) => {
    let { storeID } = req.body;
    let infoStoreAfterInfo = await STORE_MODEL.getInfo({storeID });
    console.log({ infoStoreAfterInfo })
    return res.json(infoStoreAfterInfo);
})

route.post('/list-store', async (req, res) => {
    let { storeID } = req.body;
    let infoAfterInsert = await STORE_MODEL.getList({ storeID });
    return res.json(infoAfterInsert);
})

route.post('/remove', async (req, res) => {
    let { storeID } = req.body;
    let infoStoreAfterRemove = await STORE_MODEL.remove({ storeID });
    console.log({ infoStoreAfterRemove })
    return res.json(infoStoreAfterRemove);
})

route.post('/update', async (req, res) => {
    let { name, address, hotline, storeID } = req.body;
    let infoStoreAfterUpdate = await STORE_MODEL.update({ name, address, hotline, storeID });
    console.log({ infoStoreAfterUpdate })
    return res.json(infoStoreAfterUpdate);
})

module.exports = route;