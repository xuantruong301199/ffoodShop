const route                 = require('express').Router();
const PRODUCT_MODEL        = require('../models/product');
const { renderToView } = require('../utils/childRouting');

let storeID = `5fcc6d5b148bc51ecc5d2db4`;

route.get('/add-product', async (req, res) => {
    return renderToView(req, res, 'pages/add-product', {})
});

route.post('/add-product', async (req, res) => {
    let { name, price, image, categoryID, description } = req.body;
    let infoAfterInsert = await PRODUCT_MODEL.insert({ name, price,  image, categoryID, description, store: storeID });
    return res.json(infoAfterInsert);
})

route.post('/list-product', async (req, res) => {
    let { categoryID } = req.body;
    let infoAfterInsert = await PRODUCT_MODEL.getList({ categoryID });
    return res.json(infoAfterInsert);
})

route.post('/info-product', async (req, res) => {
    let { productID } = req.body;
    let infoStoreAfterInfo = await PRODUCT_MODEL.getInfo({productID });
    console.log({ infoStoreAfterInfo })
    return res.json(infoStoreAfterInfo);
})

route.post('/remove', async (req, res) => {
    let { productID } = req.body;
    let infoAfterRemove = await PRODUCT_MODEL.remove({productID });
    return res.json(infoAfterRemove);
})

route.post('/update', async (req, res) => {
    let {name, price, image, productID } = req.body;
    console.log(name, price, image, productID );
    let infoAfterUpdate = await PRODUCT_MODEL.update({name, price, image,productID });

    console.log({ infoAfterUpdate});
    return res.json(infoAfterUpdate);
})


module.exports = route;