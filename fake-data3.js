const db = require('./modules/db_connect2');
const moment = require('moment-timezone');

const lasts = ['林','陳', '李', '吳','王','黃','邱' ,'何'];
const firsts = ['小明','大華', '小新', '小安', '人生', '國華', '小莉', '小惠'];
const lv = ['N1','M1','E1','R1','S1','C1'];

(async ()=>{
    const sql = "INSERT INTO `emp` SET ?";

    for(i=0; i<100; i++){
        const ename = lasts[Math.floor(Math.random()*lasts.length)] + firsts[Math.floor(Math.random()*firsts.length)];

        const email = 'a'+ Math.floor(Math.random()*100000) + '@test.com';
        const mobile = '09' + (10000000 + Math.floor(Math.random()*10000000));
        const hiredate = moment(new Date(315532800000+Math.random()*631152000000)).format('YYYY-MM-DD');
        
        const deptno=  Math.floor(Math.random()*6)+1;
        const level = lv[Math.floor(Math.random()*lv.length)]; 

        const obj = {
            ename,
            email,
            mobile,
            hiredate: new Date(),
            
            deptno,
            level,
        };

        const [results] = await db.query(sql, [ obj ]);

    }
    console.log('ok');
    process.exit();
})();

