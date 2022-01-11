const db = require('./modules/db_connect2');
const moment = require('moment-timezone');

const lasts = ['林','陳', '李', '吳','王','黃','邱' ,'何'];
const firsts = ['小明','大華', '小新', '小安', '人生', '國華', '小莉', '小惠'];
const lv = ['N1','M1','E1','R1','S1','C1'];

(async ()=>{
    const sql = "INSERT INTO `emp`(`empno`, `ename`,`mobile`,`email`, `hiredate`, `salary`, `deptno`, `level`) VALUES (?,?,?,?,?,?,?,?)";

    for(i=0; i<100; i++){
        const name = lasts[Math.floor(Math.random()*lasts.length)] + firsts[Math.floor(Math.random()*firsts.length)];

        const email = 'a'+ Math.floor(Math.random()*100000) + '@test.com';
        const mobile = '09' + (10000000 + Math.floor(Math.random()*10000000));
        const hiredate = moment(new Date(315532800000+Math.random()*631152000000)).format('YYYY-MM-DD');
        const salary =  Math.floor(Math.random()*60000)+25250;
        const deptno=  Math.floor(Math.random()*6)+1;
        const level = lv[Math.floor(Math.random()*lv.length)]; 

        const obj = {
            name,
            email,
            mobile,
            hiredate: new Date(),
            salary,
            deptno,
            level,
        };

        const [results] = await db.query(sql, [ obj ]);

    }
    console.log('ok');
    process.exit();
})();

