const express = require('express');
const moment = require('moment-timezone');
const db = require('./../modules/db_connect2');


const router = express.Router();

router.get('/', async (req, res)=>{
    const [rs] = await db.query(`SELECT * FROM orders`);

    // rs.forEach(el=>{
    //     el.birthday=moment(el.birthday).format('YYYY-MM-DD');

    // });

    res.render('order-list', {rs});
});

module.exports = router;
