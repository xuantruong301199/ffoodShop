const route                 = require('express').Router();
const ORDER_MODEL        = require('../models/order');

route.post('/add-order', async (req, res) => {
    let { name, price,  image, amount, orderID } = req.body;
    let infoAfterInsert = await ORDER_MODEL.insert({ name, price,  image, amount , orderID});
    return res.json(infoAfterInsert);
})

route.get('/list-order', async (req, res) => {
    let { orderID } = req.body;
    let infoAfterInsert = await ORDER_MODEL.getList({ orderID });
    return res.json(infoAfterInsert);
})

route.post('/info-order', async (req, res) => {
    let { orderID } = req.body;
    let infoStoreAfterInfo = await ORDER_MODEL.getInfo({orderID });
    console.log({ infoStoreAfterInfo })
    return res.json(infoStoreAfterInfo);
})

route.post('/remove', async (req, res) => {
    let { orderID } = req.body;
    let infoAfterRemove = await ORDER_MODEL.remove({orderID });
    return res.json(infoAfterRemove);
})

route.post('/update', async (req, res) => {
    let {name, price, image, orderID } = req.body;
    console.log(name, price, image, orderID );
    let infoAfterUpdate = await ORDER_MODEL.update({name, price, image,orderID });

    console.log({ infoAfterUpdate});
    return res.json(infoAfterUpdate);
})


module.exports = route;