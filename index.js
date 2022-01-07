require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
// const upload = multer({dest: 'tmp_uploads/'});
const upload = require('./modules/upload-module');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);

const moment = require('moment-timezone');
const db = require('./modules/db_connect2');
const sessionStore = new MysqlStore({}, db);


process.env.MODE = process.env.MODE || 'development';
console.log('process.env.MODE:', process.env.MODE);

const app = express();

app.set('view engine', 'ejs');

// Top level middlewares
app.use(require('cors')());
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'sdfgdsf456456456YIOIUOIUOf',
    // store: sessionStore,
    cookie: {
        maxAge: 1800000
    }
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next)=>{
    res.locals.title = '我的網站';
    res.locals.member = req.session.member || {};
    res.locals.admin = req.session.admin || '';

    console.log({admin: res.locals.admin, url: req.url});
    res.locals.pageName = '';  // 預設值

    // template helper functions
    res.locals.toDateString = d => moment(d).format('YYYY-MM-DD');
    res.locals.toDatetimeString = d => moment(d).format('YYYY-MM-DD HH:mm:ss');

    next();
});


app.get('/', (req, res)=>{
    res.locals.pageName = 'home';

    res.locals.title = res.locals.title ? ('首頁 - ' + res.locals.title) : '首頁';
    res.render('home', { name: 'Shinder'});
});

app.get('/json-sales', (req, res)=>{
    res.locals.pageName = 'json-sales';
    
    res.locals.title = res.locals.title ? ('表格 - ' + res.locals.title) : '表格';
    const sales = require('./data/sales');
    // console.log(sales);

    res.render('json-sales', {sales} );    
});
app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

// POSTMAN 測試
app.post('/try-post', (req, res)=>{
    res.json(req.body);
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);
});

// POSTMAN 測試 or form04.html
app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    console.log(req.file);
    res.json(req.file);
});

// POSTMAN 測試 or form05.html
app.post('/try-uploads', upload.array('photos'), (req, res)=>{
    console.log(req.files);
    res.json(req.files);
});

app.get('/pending', (req, res)=>{
});

app.get('/my-params1/:action?/:id?', (req, res)=>{
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{
    let u = req.url.slice(3);
    u = u.split('?')[0];
    u = u.split('-').join('');
    res.send(u);
});

app.use('/', require('./routes/admin2'));
app.use('/admins', require('./routes/admin2'));

app.get('/try-session', (req, res)=>{
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var ++;

    res.json({
        my_var: req.session.my_var,
        session: req.session
    })
});

app.get('/login', (req, res)=>{
    console.log('come_from:', req.session.come_from);
    console.log('referer:', req.get('Referer'));
    res.render('login');
});

app.post('/login', async (req, res)=>{
    const output = {
        success : false,
        error: '帳號或密碼錯誤',
    };
    if(!req.body.account || !req.body.password){
        output.error = '沒有帳號或密碼';
        return res.json(output);
    }
    const sql = "SELECT * FROM admins WHERE account=?";
    const [rs] = await db.query(sql, [req.body.account]);
    if(! rs.length){
        return res.json(output);
    }

    const pr = await bcrypt.compare(req.body.password, rs[0].pass_hash);
    if(pr){
        output.success = true;
        output.error = '';
        req.session.admin = req.body.account;
    }
    res.json(output);
});

app.get('/logout', async (req, res)=>{
    delete req.session.admin;
    // await req.session.destroy();
    res.redirect('/');  // 頁面轉向
});

/*
app.post('/login', (req, res)=>{
    const members = {
        shin: {
            pw: '12345',
            nickname: '小新'
        },
        ming: {
            pw: '5678',
            nickname: '小明'
        },
    };
    const output = {
        success : false,
        error: '帳號或密碼錯誤',
    };

    if(members[req.body.account]) {
        const item = members[req.body.account];
        if(req.body.password===item.pw) {
            output.success = true;
            output.error = '';
            req.session.member = {
                account: req.body.account,
                nickname: item.nickname
            };
        }

    }
    res.json(output)
});
app.get('/logout', (req, res)=>{
    delete req.session.member;
    res.redirect('/');  // 頁面轉向
});
*/

app.get('/try-date', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    let str = '<div>';
    const now = new Date;

    str += moment().format(fm) + '<br>';
    str += moment(now).tz('Europe/London').format(fm) + '<br>';
    str += moment( req.session.cookie.expires ).format(fm) + '<br>';
    str += moment( '2022-02-30' ).format(fm) + '<br>';
    
    str += '</div>';


    res.send(str);
});
/*
app.get('/try-db', (req, res)=>{
    db.query(`SELECT * FROM address_book LIMIT 3`)
    .then( ([rs]) =>{
        res.json(rs);
    })
});
*/
app.get('/try-db', async (req, res)=>{
    const [rs] = await db.query(`SELECT * FROM address_book LIMIT 3`);
    res.json(rs);
});

app.use('/address-book', require('./routes/address-book'));
app.use('/cate', require('./routes/cate'));
app.use('/product-list', require('./routes/product-list'));
app.use('/cart', require('./routes/cart'));

// 放在所有路由的後面
app.use((req, res)=>{
    res.status(404).send('<h1>找不到頁面</h1>');
});


app.listen(3000, ()=>{
    console.log('server started:', new Date().toString());
})






