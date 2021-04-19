const jwt = require('./jwt');
const CATEGORY_MODEL        = require('../models/category');
const PRODUCT_MODEL        = require('../models/product');
const currencyFormatter = require('currency-formatter');

let renderToView = async function(req, res, view, data) {
    let storeID = `5fcc6d5b148bc51ecc5d2db4`;
    let { token } = req.session;
    if(token){
        let user = await jwt.verify(token);
        data.infoUser = user.data;
    }else{
        data.infoUser = undefined;
    }

    let listCategory = await CATEGORY_MODEL.getList({ storeID });

    //Lay tat ca san pham cua cua hang
    let listProduct = await PRODUCT_MODEL.getList({ storeID });

    data.listCategory = listCategory.data;
    data.listProduct = listProduct.data;
    data.currencyFormatter = currencyFormatter;

    return res.render(view, data);
}

exports.renderToView = renderToView;