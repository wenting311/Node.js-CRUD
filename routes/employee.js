const express = require('express');
const moment = require('moment-timezone');
const db = require('./../modules/db_connect2');

const router = express.Router();

router.use((req, res, next)=>{
    const whitelist = ['/'];
    const path = req.url.split('?')[0];
    // console.log(path)

    // 如果沒有登入
    if(!req.session.admin) {

        // 如果路徑不在白名單內
        if(! whitelist.includes(path) ){
            req.session.come_from = req.originalUrl;
            console.log('come_from:req.originalUrl:', req.originalUrl);
            return res.redirect('/login');
        }        
    }
    next();
});






router.get('/add', async (req, res)=>{
    res.render('emp-add');
});
router.post('/add', async (req, res)=>{
    const output = {
        success: false,
        error: '',
        results: null,
        body: req.body, 
    }

    // TODO: 欄位資料的檢查

    const sql = "INSERT INTO `emp`(`empno`, `ename`,`mobile`,`email`, `hiredate`, `deptno`, `level`) VALUES (?,?,?,?,?,?,?)";
    const [results] = await db.query(sql, [
        req.body.empno,        
        req.body.ename, 
        req.body.mobile, 
        req.body.email,        
        req.body.hiredate,
        req.body.deptno,
        req.body.level,
    ]);

    output.results = results;

    if(results.affectedRows){
        output.success = true;
        output.insertId = results.insertId;
    }

    res.json(output);
});

router.get('/del/:empno', async (req, res)=>{
    const empno = parseInt(req.params.empno);
    if(!empno){
        return res.redirect(req.baseUrl);  // 轉向
    }
    // return res.send(req.get('Referer'));

    const sql = "DELETE FROM emp WHERE empno=?";
    const [results] = await db.query(sql, [empno]);

    const referer = req.get('Referer'); // 人從哪裡來
    if(referer){
        res.redirect(referer);
    } else {
        res.redirect(req.baseUrl);
    }
});

router.get('/edit/:empno', async (req, res)=>{
    const empno = parseInt(req.params.empno);
    if(!empno){
        return res.redirect(req.baseUrl);  // 轉向
    }
    const sql = "SELECT empno,ename,mobile,email,hiredate, lv.salary,emp.deptno, dept.dname,emp.level,lv.title FROM emp JOIN dept ON emp.deptno = dept.deptno JOIN lv ON emp.level=lv.level WHERE empno=?";
    const [rs] = await db.query(sql, [empno]);
    if(! rs.length){
        return res.redirect(req.baseUrl);  // 轉向
    }

    // return res.json(rs[0]);
    rs[0].referer = req.get('Referer') || ''; // 人從哪裡來

    res.render('emp-edit', rs[0]);
});
router.post('/edit/:empno', async (req, res)=>{
    const output = {
        success: false,
        error: '',
        code: 0,
    };

    const empno = parseInt(req.params.empno);
    if(!empno){
        output.error = '編號錯誤';
        output.code = 410;
        return res.json(output);
    }
    const sql = "SELECT empno,ename,mobile,email,hiredate, lv.salary,emp.deptno, dept.dname,emp.level,lv.title FROM emp JOIN dept ON emp.deptno = dept.deptno JOIN lv ON emp.level=lv.level WHERE empno=?";
    const [rs] = await db.query(sql, [empno]);
    if(! rs.length){
        output.error = '編號錯誤';
        output.code = 420;
        return res.json(output);
    }

    const sql2 = "UPDATE `emp` SET ? WHERE empno=?";
    const [results] = await db.query(sql2, [req.body, empno]);

    // res.json(results); 
    // affectedRows: 有找到的資料筆數
    // changedRows: 真正有修改到的資料筆數
    output.results = results;

    if(results.changedRows){
        output.success = true;
    } else {
        output.error = '資料沒有修改';
    }

    
    res.json(output);

});

router.get('/', async (req, res)=>{
    res.locals.pageName = 'emp-list';

    const perPage = 10; // 每頁有幾筆
    let rows = []; // 該頁的資料, 預設為空陣列

    let page = req.query.page ? parseInt(req.query.page) : 1;

    // 處理 page 超出範圍
    if(page<1 || !page){
        return res.redirect('?page=1');
    }

    const [rs1] = await db.query(`SELECT COUNT(1) num FROM emp`);
    const totalRows = rs1[0].num; // 總筆數

    let totalPages = 0; // 總頁數預設值
    if(totalRows) {
        totalPages = Math.ceil(totalRows/perPage); // 計算總頁數

        // 處理 page 超出範圍
        if(page > totalPages){
            return res.redirect('?page='+totalPages);
        }


        const sql = `SELECT empno,ename,mobile,email,hiredate, lv.salary,emp.deptno, dept.dname,emp.level,lv.title FROM emp JOIN dept ON emp.deptno = dept.deptno JOIN lv ON emp.level=lv.level ORDER BY empno DESC LIMIT ${(page-1)*perPage}, ${perPage} ;`;

        [rows] = await db.query(sql);
        
    }

    const output = {
        perPage,
        page,
        totalRows,
        totalPages,
        rows,
    };
    // return res.json(output); // 測試
    if(req.session.admin){
        res.render('emp-list', output);
      

    } else {
        res.render('emp-list-no-admin', output);
    }
    
});



module.exports = router;
