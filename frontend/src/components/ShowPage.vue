<template>
  <div id="rootdiv">
    <div class="maincontents" style="float: left; width: 75%;height:100%">
      <div class="main_panels" style="height:100%;padding-top:1%">
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/thermometer.png" style="height:240px;weight:240px"></div>
        <div class="panel_content">
          <p class="content_title">온도</p>  
          <p class="content_value">{{data.t}}<span class="content_unit"> °C</span></p>
        </div>
      </div >
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/humidity.png" style="height:240px;weight:240px"></div>
        <div class="panel_content">
          <p class="content_title">습도</p>  
          <p class="content_value">{{data.h}}<span class="content_unit"> %</span></p>
          </div>
      </div>
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/co2.png" style="height:240px;weight:240px"></div>
        <div class="panel_content">
          <p class="content_title">CO<span style="font-size:50%">2</span></p>  
          <p class="content_value">{{data.c}}<span class="content_unit"> ㎍/㎥</span></p>
          </div>
      </div>
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/brightness.png" style="height:240px;weight:240px"></div>
        <div class="panel_content">
          <p class="content_title">조도</p>  
          <p class="content_value">{{data.i}}<span class="content_unit"> lx</span></p>
          </div>
      </div>
    </div>
    <!-- <div style="height:4%"></div>
    <div class="main_control">
      <div style="height:100%">
        <form id="" action="http://127.0.0.1:3000/api/send/3/" method="get" style="height:100%">
          <div class="control_panel">
            <input name="fan" type="range" min="1" max="10" step="1" value="1" oninput="fanvalue.value=this.value"/>
	          <output name="fanvalue" for="range" value="1" style="color:white">1</output><br/>
          </div>
          <div class="control_panel">
            <input name="red" type="range" min="1" max="10" step="1" value="1" oninput="redvalue.value=this.value"/>
	          <output name="redvalue" for="range" value="1" style="color:white">1</output><br/>
          </div>
          <div class="control_panel">
            <input name="blue" type="range" min="1" max="10" step="1" value="1" oninput="bluevalue.value=this.value"/>
	          <output name="bluevalue" for="range" value="1" style="color:white">1</output><br/>
          </div>
          <div class="control_panel">
            <input name="white" type="range" min="1" max="10" step="1" value="1" oninput="whitevalue.value=this.value"/>
	          <output name="whitevalue" for="range" value="1" style="color:white">1</output><br/>
          </div>
          <div class="control_panel">
            <input type="button" value="적용" onclick="location.href='http://localhost:3000/api/send/3/fan.value/red.value/blue.value/red.value'">
          </div>
        </form>
      </div>
    </div> -->
    </div>
    
    <div class="sidecontents" style="height:100%">
        <h1 style="color:white;text-align:center;font-size:40px;font-family: 'Nanum Gothic', sans-serif;text-shadow: 2px 2px 2px black; ">IoT 심마니</h1>
        <p style="color:white;padding-left:17px;font-size:13px;font-weight:500;font-family: 'Nanum Gothic', sans-serif;text-shadow: 5px 5px 5px black; "> 그치만.. 이렇게라도 안하면 와타시는 인삼쨩을 만날 수 없는걸..!</p>
        <p class="sidecontents_subtitles">우리는 IoT 심마니입니다.</p>
        <p class="sidecontents_subtitles">심마니가 누구죠?</p>
        <p class="sidecontents_contents">심마니는 산삼(인삼)을 캐거나 기르는 사람입니다.<br>흔히들 알고 있는, "심봤다!" 를 외치는 사람들입니다.</p>
        <p class="sidecontents_contents">우리는 우리가 가진 IoT 기술로 사람의 손길을 거의<br> 거치지 않고 인삼을 재배하는 제품을 만들었습니다.</p>
        <p class="sidecontents_contents">그래서 우리는 우리를 IoT 심마니라고 부릅니다.</p>
        <p class="sidecontents_subtitles">인삼을 어떻게 돌보나요?</p>
        <p class="sidecontents_contents">우리는 반복적인 실험와 식물학적 연구를 통해, 인삼이  자라기에 가장 적합한 적색광/청색광 간의 비율, 양액과 물의 비율,공기상태와 온도 등을 알아냈습니다.</p>
        <p class="sidecontents_contents">그렇게 3달간 쌓아온 지식을 우리의 기술력과 합쳤습니다. 우리가 만든 장치들은 우리가 연구한, 인삼이 가장 잘 자랄 수 있는 환경이 될 수 있도록 조절해 줍니다.</p>
        <p class="sidecontents_contents">그 덕분에, 우리의 제품은 마치 사람이 세심한 관리를<br> 하는 것과 같이 인삼을 재배할 수 있습니다. </p>
    </div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:0;height:0">
      <filter id="blur">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </svg>  
  </div>
</template>

<script>
function httpGet (theUrl) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open(`GET`, theUrl, false) // false for synchronous request
  xmlHttp.send(null)
  return xmlHttp.responseText
}
export default {
  components: {
    httpGet
  },
  created: function () {
    this.$http.get(`http://localhost:3000/api/giveme/3`)
    this.$http.get(`/api/get`)
    .then((response) => {
      this.data = response.data
    })
  },
  data: function () {
    return {
      data: {}
    }
  }
}
</script>

<style lang="css">
.control_panel{
  float: left;
  /* background-color: blue; */
  border: 2px black solid;
  width: 20%;
  height: 80%;
}
.main_control{
  background-color: rgba(255,255,255,0.8);
  height: 16%;
  border-radius: 5px 5px 0 0;
}
/*  */
.maincontents{
  width: 10%;
  height: 80%;
}
.sidecontents_subtitles{
  color: white;
  font-family: 'Nanum Gothic', sans-serif;  
  font-size: 170%;
  font-weight: 500;
  text-align: left;
  text-shadow: 2px 2px 2px black; 
  margin-left: 10px
}
.sidecontents_contents{
  color: white;
  font-family: 'Nanum Gothic', sans-serif;  
  font-size: 100%;
  font-weight: 500;
  text-align: left;
  text-shadow: 2px 2px 2px black; 
  margin-left: 10px
}
.sidecontents {
  float: left; 
  width: 25%;
  height: 100%;
  background: url('../../img/ginseng_2.jpg');
  background-size:cover;
  position: relative;
  z-index:1;  
}
.sidecontents:before {
  content: '';
  position: absolute;
  top: 0; left:0; right:0; bottom:0;
  background: inherit;
  z-index:-1;
  filter: blur(6px); 
  -webkit-filter: blur(6px); 
  -moz-filter: blur(6px);
  -o-filter: blur(6px);
  filter:url(#blur);
}

  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  body{margin: 0 0 0 0;height: 100%}
  html,#rootdiv,#app{
    height:100%;
  }
  #rootdiv{
    background: url('../../img/ginseng_3.jpg') center;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .sidecontents:before {
    content: '';
    position: absolute;
    top: 0; left:0; right:0; bottom:0;
    background: inherit;
    z-index:-1;
    filter: blur(6px); 
    -webkit-filter: blur(6px); 
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    filter:url(#blur);
}
  .sensor_panel{
    float: left; 
    width: 45%;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.9);
    -webkit-box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.75);
    margin:2.5% 1% 2.5% 2.5%;
  }
  .sensor_panel:before {
    content: '';
    position: absolute;
    top: 0; left:0; right:0; bottom:0;
    background: inherit;
    z-index:-1;
    filter: blur(6px); 
    -webkit-filter: blur(6px); 
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    filter:url(#blur);
}
  .content_title{
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 250%;
    font-weight: 400;
  }
  .content_value{
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 350%;
    font-weight: 400; 
  }
  .content_unit{font-size: 50%}
  .panel_icons{
    float: left; 
    width: 50%;
    margin: 10px 0px 10px 10px;
  }
</style>
