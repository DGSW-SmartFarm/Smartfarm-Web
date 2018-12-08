const bodyParser = require('body-parser');
var SerialPort=require('serialport');
var port = new SerialPort("COM5",{
    baudRate:115200
}); 
const device=3;    
// port.on('open', function() {
//     port.write('1', function(err) {
//         if (err) {
//             return console.log('Error on write: ', err.message);
//         }
//     });
// });//포트 연결되면 시작되는 콜백함수
    
// open errors will be emitted as an error event

//1은 r 2는 g 3은 b 4는 f 
let sensor = [//대괄호이다
    {
        id :'r',
        value :0//0~255
    },
    {
        id:'g',
        value :0
    },
    {
        id:'b',
        value :0
    },
    {
        id:'f',
        value :0
    },
    {
        id:'i',//조도
        value:0
    },
    {
        id:'t',//온도
        value:0
    },
    {
        id:'w',//습도
        value:0
    },
    {
        id:'c',//CO2
        value:0
    }
];
exports.index=(req,res)=>{
//    res.send(sensor);
    return res.json(sensor);
};
exports.SendValue=(req,res)=>{
    const r=req.body.r||'';
    const g=req.body.g||'';
    const b=req.bdoy.b||'';
    const w=req.body.w||'';
    const l=req.body.l||'';
    var str="\x02L"+l+"R"+r+"G"+g+"B"+b+'\x0d\x0a\x03';
    var buf=new Buffer(str);
    port.write(buf);
};
exports.RequestValue=(req,res)=>{
    var str="\x02T"+device.toString()+"TEMP?\x03\x0A\x0D";
    var buf=new Buffer(str);
    port.write(buf);
    res.redirect('/');
};
exports.changeValue=(req,res)=>{
    const id=req.body.id||'';
    const value=req.body.value||'';
    if(!value.length&&!id.length){
        return res.status(400).json({error: 'Incorrect value'});
    }
    const sensorIdx = sensor.findIndex(s=>{
        return s.id===id;
    });
    if(sensorIdx===-1){
        return res.status(404).json({error: 'Unknown sensor'});
    }
    sensor[id].value=value;
};
port.on('error', function(err) {
    console.log('Error: ', err.message);
});
    
port.on('data', function (data) {
    //받으면 바로 파일이나 디비에 전에 데이터를 저장하자. 프로토콜은 분,초?
    var buf=new Buffer(data);
    //받은 데이터는 데이터
    var tmp={
        't':0,
        'h':0,
        'c':0,
        'i':0
    };
    var now;
    var fl=0;
    for(var i=3;i<data.length;i++){
        if(data[0]=='\x02'){
            console.log("start");
            if(data[1]=='T'){
                if(data[2]==device.toString()){
                    console.log("Check device");
                    switch(data[i]){
                        case 't':
                        if(fl){
                            tmp[now]/=fl;
                            fl=0;
                        }
                        now=data[i];
                        break;
                        case 'h':
                        if(fl){
                            tmp[now]/=fl;
                            fl=0;
                        }
                        now=data[i];
                        break;
                        case 'c':
                        if(fl){
                            tmp[now]/=fl;
                            fl=0;
                        }
                        now=data[i];
                        break;
                        case 'i':
                        if(fl){
                            tmp[now]/=fl;
                            fl=0;
                        }    
                        now=data[i];
                        break;
                        case '\x03':
                        if(fl){
                            tmp[now]/=fl;
                            fl=0;
                        }
                        sensor['t']=tmp['t'];
                        sensor['h']=tmp['h'];
                        sensor['c']=tmp['c'];
                        sensor['i']=tmp['i'];
                        break;
                        case '.':
                        fl=1;
                        default://숫자
                        tmp[now]*=10;
                        tmp[now]+=data[i];
                        fl*=10;
                    }
                }
            }
        }
    }        
    console.log('Read and Send Data : ' + data);
});//데이터를 받으면 실행되는 콜백함수