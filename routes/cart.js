const express = require('express');
const db = require('./../modules/db_connect2');

const router = express.Router();

router.post('/add', async (req, res)=>{
    req.session.cart = req.session.cart || [];
    // req.body.sid // 產品的 PK
    // req.body.qty // 數量

    const {sid, qty} = req.body;
    // TODO: 檢查有沒有這個產品
    
    // 先判斷之前有沒有加過
    let addedBefore = false;
    req.session.cart.forEach(item=>{
        if(item.sid==sid){
            addedBefore = true;
            item.qty += +qty;
        }
    });
    if(!addedBefore){
        req.session.cart.push({ sid: +sid, qty: +qty})
    }

    res.json(req.session.cart);

});

// 清空購物車
router.get('/clear',  (req, res)=>{
    req.session.cart =  [];
    res.json(req.session.cart);
});


module.exports = router;
