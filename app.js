const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const expressSession    = require('express-session');
//const logger          = require('morgan');

const STORE_ROUTING = require('./routers/store')
const CATEGORY_ROUTING = require('./routers/category')
const PRODUCT_ROUTING = require('./routers/product')
const USER_ROUTING = require('./routers/user')
const ORDER_ROUTING = require('./routers/order')
const PUBLIC_ROUTING = require('./routers/public')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
//app.use(logger('dev'))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressSession({
    secret: 'fast-food',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 * 100
    }
}))

app.use('/store', STORE_ROUTING);
app.use('/category', CATEGORY_ROUTING);
app.use('/product', PRODUCT_ROUTING);
app.use('/user', USER_ROUTING);
app.use('/order',ORDER_ROUTING);
app.use('/',PUBLIC_ROUTING);

const uri = 'mongodb://localhost/fast_food';

const PORT = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
