const route                 = require('express').Router();
const CATEGORY_MODEL        = require('../models/category');

let STATUS_CATEGORY = [
    {
        value: 0,
        text: 'Khong hoat dong'
    },
    {
        value: 1,
        text: 'Dang hoat dong'
    }
]

let storeID = `5fcc6d5b148bc51ecc5d2db4`;

route.get('/add-category', async (req, res) => {
    let listCategory = await CATEGORY_MODEL.getList({ storeID });
    return res.render('pages/add-category', { listCategory: listCategory.data, STATUS_CATEGORY });
})



route.post('/add', async (req, res) => {
    let { name, image } = req.body;
    let infoAfterInsert = await CATEGORY_MODEL.insert({ name, image, storeID });
    return res.json(infoAfterInsert);
})

route.post('/info', async (req, res) => {
    let { categoryID } = req.body;
    let infoCategory = await CATEGORY_MODEL.getInfo({ categoryID });
    return res.json(infoCategory);
})

route.post('/list', async (req, res) => {
    let { storeID } = req.body;
    let infoAfterInsert = await CATEGORY_MODEL.getList({ storeID });
    return res.json(infoAfterInsert);
})

route.post('/remove', async (req, res) => {
    let { categoryID } = req.body;
    let infoAfterRemove = await CATEGORY_MODEL.remove({ categoryID });
    return res.json(infoAfterRemove);
})

route.post('/update', async (req, res) => {
    let { categoryID, name, image } = req.body;
    let infoAfterUpdate = await CATEGORY_MODEL.update({ categoryID, name, image });
    return res.json(infoAfterUpdate);
})

module.exports = route;