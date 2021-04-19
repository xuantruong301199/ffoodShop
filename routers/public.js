const route                 = require('express').Router();
const PRODUCT_COLL = require('../databases/product-coll');
const PRODUCT_MODEL = require('../models/product');
const { renderToView } = require('../utils/childRouting');

route.get('/dang-nhap', async (req, res) => {
    return res.render('pages/login');
})

route.get('/cart', async (req, res) => {
    return renderToView(req, res, 'pages/cart.ejs', {})    
})

route.get('/contacts', async (req, res) => {
    return renderToView(req, res, 'pages/contacts.ejs', {})    
})

route.get('/menu', async (req, res) => {
    let { categoryID } = req.query;
    let listProductOfCategory = await PRODUCT_MODEL.getListOfCategory({ categoryID });
    return renderToView(req, res, 'pages/menu.ejs', { listProductOfCategory: listProductOfCategory.data })
})

route.get('/about', async (req, res) => {
    return renderToView(req, res, 'pages/about.ejs', {})
})

route.get('/order', async (req, res) => {
    return renderToView(req, res, 'pages/order.ejs', {})
})

//Trang home
route.get('/', async (req, res) => {
    return renderToView(req, res, 'pages/home.ejs', {})
})

route.get('/dang-xuat', async (req, res) => {
    req.session.token = undefined;
    return res.redirect('/')
})


module.exports = route;