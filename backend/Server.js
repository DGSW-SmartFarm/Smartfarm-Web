/*
무엇을 해야하는가?
coretex의 센서로부터 값을 받아온다. 그거를 수치로 받아 띄운다 혹은 보낸다
웹이기 때문에 아마 직접 뛰움과 동시에 민석이가 만드는 라즈베리파이에 보내서 거기의 파이큐티로도 뛰울것이다.
그리고 라즈베리파이나 웹에서 뭘 하라고 값을 받으면 센서로 보내서 실행? 혹은 자동화.
렛츠 기릿
*/

const express=require('express');
const app = express();
const hostname='127.0.0.1';
const port='728';
const router=express.Router();
const controller = require('./api/controller');
app.use(express.static('public'));

app.get('/',controller.index);
app.post('/cha',controller.changeValue);
app.post('/send',controller.SendValue);
app.get('/giveme',controller.RequestValue);
//웹서버 페이지

//웹서버가 열렸을 떄 일어날 일들
app.listen(port,()=>{
    console.log('Server running on http://'+hostname+':'+port+'/');
    //여기에 웹서버 열리면 알려줄거 더있는가?
});