
const { spawn } = require('child_process');

const ls = spawn('python', ['E:/crewler/test.py']);

ls.stdout.on('data', data=>{
    console.log(`stdout: ${data}`);
});
ls.stderr.on('data', data=>{
    console.error(`stderr: ${data}`);
});

ls.on('close', code=>{
    console.log(`close: ${code}`);
});
ls.on('error', error=>{
    console.log(`error: ${error}`);
});

