//값 디비에 저장하고 가능하면 값을 받자마자 return json해라 이거두개하면 끝~~~(가능?)  값은 10분에 한번 씩 받는다. 테스트는 딜레이없이 하지만 그래프 없다고 했으니 안해도될듯
//curl -XGET localhost:728/get
//curl -XGET localhost:728/giveme

const bodyParser = require('body-parser');
var SerialPort = require('serialport');
//require('date-utils');
//var date = new Date();

var port = new SerialPort("COM5", {
    baudRate: 115200
});
var device=3;
let sensor = {//대괄호이다
    't': 0,
    'h': 0,
    'c': 0,
    'i': 0
};
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '10.80.161.196',
    user: 'raspi',
    password: '1234',
    database: 'smartfarm',
    port: '3306'
});

connection.connect();

//connection.end();
exports.index = (req, res) => {
    //    res.send(sensor);
    return res.json(sensor);
};
exports.SendValue = (req, res) => {
    const l = parseInt(req.params.l, 10)%256;
    const f = parseInt(req.params.f, 10)%256;
    const r = parseInt(req.params.r, 10)%256;
    const b = parseInt(req.params.b, 10)%256;
    const w = parseInt(req.params.w, 10)%256;
    
    var str = "\x02L0" + l + "W" + f + "R" + r + "G" + g + "B" + w + '\x0d\x0a\x03';
    var buf = new Buffer(str);
    port.write(buf);
};
exports.RequestValue = (req, res) => {//분 %10이 0일때 한번씩 호출하자
    device=req.params.device;
    var str = "\x02T" + device.toString() + "TEMP?\x03\x0A\x0D";
    var buf = new Buffer(str);
    port.write(buf);
    res.redirect('/');
};
/*exports.GetTime = (req, res) => {
    tim = Date.toFormat('YYYYMMDDHH24MI');
    return res.string(String.fromCharCode(tim));
};*/


exports.Getdb = (req, res) => {
    const tmp = parseInt(req.params.tim, 10);
    if(tmp==0){
        connection.query('select * from sensor order by tim DESC', function(err, rows, fields) {
            if (err) throw err;
            return res.json(rows[0]);
        });
    }
    connection.query(`select * from sensor where tim=${tmp}`, function(err, rows, fields) {
        if (err) throw err;
        return res.json(rows[0]);
    });
};

port.on('open', function () {
    port.write('1', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        //db에서 값 한번 받아오자 최근꺼
        console.log('port connected!');
    });
});

port.on('error', function (err) {
    console.log('Error: ', err.message);
});

port.on('data', (buf)=> {
    var data = new Buffer(buf, "hex");
    var tmp = {
        'T': 0,
        'H': 0,
        'C': 0,
        'I': 0
    };
    var now;
    var fl = 0;
    var pl = 1;
    for (var i = 3; i < data.length; i++) {
        if (String.fromCharCode(data[0]) == '') {
            if (String.fromCharCode(data[1]) == 'T') {
                if (String.fromCharCode(data[2]) == device) {
                    switch (String.fromCharCode(data[i])) {
                        case 'T':
                            if (fl || !pl < 0) {
                                tmp[now] = tmp[now] / fl * pl;
                                fl = 0;
                                pl = 1;
                            }
                            now = String.fromCharCode(data[i]);
                            break;
                        case 'H':
                            if (fl || pl < 0) {
                                tmp[now] = tmp[now] / fl * pl;
                                fl = 0;
                                pl = 1;
                            }
                            now = String.fromCharCode(data[i]);
                            break;
                        case 'C':
                            if (fl || pl < 0) {
                                tmp[now] = tmp[now] / fl * pl;
                                fl = 0;
                                pl = 1;
                            }
                            now = String.fromCharCode(data[i]);
                            break;
                        case 'I':
                            if (fl || pl < 0) {
                                tmp[now] = tmp[now] / fl * pl;
                                fl = 0;
                                pl = 1;
                            }
                            now = String.fromCharCode(data[i]);
                            break;
                        case '':
                            if (fl || pl < 0) {
                                tmp[now] = tmp[now] / fl * pl;
                                fl = 0;
                                pl = 1;
                            }
                            sensor['t'] = tmp['T'];
                            sensor['h'] = tmp['H'];
                            sensor['c'] = tmp['C'];
                            sensor['i'] = tmp['I'];
                            console.log("put");
                            console.log(sensor['t']);
                            console.log(sensor['h']);
                            console.log(sensor['c']);
                            console.log(sensor['i']);
                            break;
                        case '.':
                            fl = 1;
                            break;
                        case '+':
                            pl = 1;
                            break;
                        case '-':
                            pl = -1;
                            break;
                        default://숫자
                            var convertdata;
                            convertdata = parseInt(data[i]) - 48;
                            console.log(convertdata);
                            tmp[now] *= 10;
                            tmp[now] += convertdata;
                            fl *= 10;
                    }
                }
            }
        }
    }

    //tim=date.toFormat('YYYYMMDDHH24MISS');
    console.log(sensor);
    connection.query(`insert into sensor values(0,${sensor['t']},${sensor['h']},${sensor['c']},${sensor['i']});`, function (err, rows, fields) {
        if (err){
            throw err;
        }    
        console.log('The solution is: ', rows[0]);
    });
    console.log('Read and Send Data : ' + data);
    //return res.json(sensor);
    //여기서 바로 res.json return 하게 가능?
    //    String.fromCharCode(askii);
});//데이터를 받으면 실행되는 콜백함수
/*
,(req,res)=>{
    return res.json(sensor);
}
*/
setInterval(() => {
    // app is running
}, 1000);

const gracfulCleanJob = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        // cleaning job done
        resolve();
    }, 3000);
});

process.on('SIGINT', function () {
    console.log("Caught interrupt signal");
    connection.end();
    process.exit();
    gracfulCleanJob().then(() => {
    })
});