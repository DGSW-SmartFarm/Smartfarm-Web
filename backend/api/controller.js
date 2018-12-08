//값 디비에 저장하고 가능하면 값을 받자마자 return json해라 이거두개하면 끝~~~(가능?)


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
let sensor = {//대괄호이다
    't':0,
    'h':0,
    'c':0,
    'i':0
};
exports.index=(req,res)=>{
//    res.send(sensor);
    return res.json(sensor);
};
exports.SendValue=(req,res)=>{
    const l=req.body.l||'';
    const f=req.body.f||'';
    const r=req.bdoy.r||'';
    const b=req.body.b||'';
    const w=req.body.w||'';
    var str="\x02L0"+l+"W"+f+"R"+r+"G"+g+"B"+w+'\x0d\x0a\x03';
    var buf=new Buffer(str);
    port.write(buf);
};
exports.RequestValue=(req,res)=>{
    var str="\x02T"+device.toString()+"TEMP?\x03\x0A\x0D";
    var buf=new Buffer(str);
    port.write(buf);
    res.redirect('/');
};

port.on('error', function(err) {
    console.log('Error: ', err.message);
});
    
port.on('data', function (buf) {
    //받으면 바로 파일이나 디비에 전에 데이터를 저장하자. 프로토콜은 분,초?
    var data=new Buffer(buf,"hex");
    //받은 데이터는 데이터
    var tmp={
        'T':0,
        'H':0,
        'C':0,
        'I':0
    };
    var now;
    var fl=0;
    var pl=1;
    for(var i=3;i<data.length;i++){
        if(String.fromCharCode(data[0])==''){
            if(String.fromCharCode(data[1])=='T'){
                if(String.fromCharCode(data[2])==device.toString()){
                    switch(String.fromCharCode(data[i])){
                        case 'T':
                        if(fl||!pl<0){
                            tmp[now]=tmp[now]/fl*pl;
                            fl=0;
                            pl=1;
                        }
                        now=String.fromCharCode(data[i]);
                        break;
                        case 'H':
                        if(fl||pl<0){
                            tmp[now]=tmp[now]/fl*pl;
                            fl=0;
                            pl=1;
                        }
                        now=String.fromCharCode(data[i]);
                        break;
                        case 'C':
                        if(fl||pl<0){
                            tmp[now]=tmp[now]/fl*pl;
                            fl=0;
                            pl=1;
                        }
                        now=String.fromCharCode(data[i]);
                        break;
                        case 'I':
                        if(fl||pl<0){
                            tmp[now]=tmp[now]/fl*pl;
                            fl=0;
                            pl=1;
                        }
                        now=String.fromCharCode(data[i]);
                        break;
                        case '':
                        if(fl||pl<0){
                            tmp[now]=tmp[now]/fl*pl;
                            fl=0;
                            pl=1;
                        }
                        sensor['t']=tmp['T'];
                        sensor['h']=tmp['H'];
                        sensor['c']=tmp['C'];
                        sensor['i']=tmp['I'];
                        console.log("put");
                        console.log(sensor['t']);
                        console.log(sensor['h']);
                        console.log(sensor['c']);
                        console.log(sensor['i']);
                        break;
                        case '.':
                        fl=1;
                        break;
                        case '+':
                        pl=1;
                        break;
                        case '-':
                        pl=-1;
                        break;
                        default://숫자
                        var convertdata;
                        convertdata=parseInt(data[i])-48;
                        console.log(convertdata);
                        tmp[now]*=10;
                        tmp[now]+=convertdata;
                        fl*=10;
                    }
                }
            }
        }
    }        
    console.log('Read and Send Data : '+data);
    //여기서 바로 res.json return 하게 가능?
//    String.fromCharCode(askii);
});//데이터를 받으면 실행되는 콜백함수

