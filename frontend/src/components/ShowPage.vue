<template>
  <div>
    <div style="float: left; width: 75%;">
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/temperature.png"></div>
        <div class="panel_content">
          <p class="content_title">온도</p>  
          <p class="content_value">{{data.t}}<span class="content_unit"> °C</span></p>
        </div>
      </div >
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/humidity.png"></div>
        <div class="panel_content">
          <p class="content_title">습도</p>  
          <p class="content_value">{{data.h}}<span class="content_unit"> %</span></p>
          </div>
      </div>
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/co2.png"></div>
        <div class="panel_content">
          <p class="content_title">CO<span style="font-size:50%">2</span></p>  
          <p class="content_value">{{data.c}}<span class="content_unit"> ㎍/㎥</span></p>
          </div>
      </div>
      <div class="sensor_panel">
        <div class="panel_icons"><img src="../../img/brightness.png"></div>
        <div class="panel_content">
          <p class="content_title">조도</p>  
          <p class="content_value">{{data.i}}<span class="content_unit"> lx</span></p>
          </div>
      </div>
    </div>
    <div style="float: left; width: 25%">
        <h1>DGSW-Smartfarm</h1>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    this.$http.get(`http://localhost:3000/api/giveme/3`)
    // 갱신하고나서 불러옴
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
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  body{margin: 0 0 0 0}
  .sensor_panel{
    float: left; 
    width: 48%;
    border:2px solid gray; 
    border-radius: 10px;
    margin:1% 0% 0% 1%;
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
