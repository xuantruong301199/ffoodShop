const route             = require('express').Router();
const USER_MODEL       = require('../models/user');

route.post('/dang-ky', async (req, res) => {
    let { email, password, fullname } = req.body;
    let infoUserAfterInsert = await USER_MODEL.register({ email, password, fullname });
    return res.json(infoUserAfterInsert);
})


route.post('/dang-nhap', async (req, res) => {
    //req.session.isLogin = true;
    
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn({email, password});
    console.log(infoUser);
    
    //console.log(infoUser)

    if(infoUser.error){
        return res.json(infoUser);
    }else{
        // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
        req.session.token = infoUser.data.token; //gán token đã tạo cho session
        req.session.email = req.body.email;
        req.session.user = infoUser.data;
    }
    res.json(infoUser)
})

route.get('/list-user', async (req, res) => {
    let listUser = await USER_MODEL.getList();
    return res.json(listUser);
})

route.post('/info-user', async (req, res) => {
    let { userID } = req.body;
    let infoUser = await USER_MODEL.getInfo({userID });
    console.log({ infoUser })
    return res.json(infoUser);
})

route.post('/remove', async (req, res) => {
    let { userID } = req.body;
    let infoAfterRemove = await USER_MODEL.remove({userID });
    return res.json(infoAfterRemove);
})

route.post('/update', async (req, res) => {
    let {fullname, email, phone, birthday, province, district, image, userID } = req.body;
    console.log(fullname, email, phone, birthday, province, district, image, userID );
    let infoAfterUpdate = await USER_MODEL.update({fullname, email, phone, birthday, province, district, image, userID });

    console.log({ infoAfterUpdate});
    return res.json(infoAfterUpdate);
})


module.exports = route;