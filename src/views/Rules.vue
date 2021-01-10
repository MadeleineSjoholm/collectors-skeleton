<template>
  <div>

  <div class="informationn">
    <div class="infoButtonn" id="infoo">
        <router-link :to="{ name: 'Home', params: {} }"><img src="/images/pil.png" width= "60" ></router-link>
        {{ labels.homepage }}
    </div>

        <div class="languageSelectorr" align="right">
          <div class="english" @click="language('en')"><img src="/images/english.png" width="40"></div>
          <div class="swedish" @click="language('se')"><img src="/images/swedish.png" width="40"></div>
        </div>
    </div>
    <div class="itemInfo">
      <h1>Item</h1>
      <p>{{ labels.workDescription }}</p>
    </div>
    <div class="skillInfo">
      <h1>Skills</h1>
      <p>{{ labels.skillDescription }}</p>
      <h3>Special Skills</h3>

      <img src="/images/workdollar.png" width= "50" >{{ labels.workDollar }}<br>
      <img src="/images/workcard.png" width= "50" >{{ labels.workCard }}<br>
      <img src="/images/skillbottle.png" width= "50" >{{ labels.skillBottle }}<br>
      <img src="/images/skilldollar.png" width= "50" >{{ labels.skillDollar }}<br>
      <img src="/images/skillstar.png" width= "50" >{{ labels.skillStar }}<br>
      <img src="/images/skillsstars.png" width= "50" >{{ labels.skillStars }}<br>
    </div>
    <div class="workInfo">
      <h1>Work</h1>
      <p>{{ labels.workDescription }}</p>
    </div>
    <div class="auctionInfo">
      <h1>Auction</h1>
      <p>{{ labels.auctionDescription }}</p>
    </div>
    <div class="marketInfo">
      <h1>Market</h1>
      <p>{{ labels.marketDescription }}</p>
    </div>

    <div class="scoring">
      <h1>Scoring</h1>
    </div>
  </div>


  </template>

  <script>
  // @ is an alias to /src


  export default {
    name: 'Rules',
    data: function() {
      return {
        labels: {

        }
      }
    },
    created: function () {
      this.language('en');
      this.$store.commit('SET_ROOM_ID');
      this.$store.state.socket.on(
        "languageLabels",
        function (labels) {
          this.labels = labels;
        }.bind(this)
      );
    },
    methods: {
      language: function (lang) {
        this.$store.commit('SET_LANG', lang);
        this.$store.state.socket.emit('getLabels', lang);
      },
    }

  }
  </script>
  <style>

  .informationn{
    display: grid;
    width: auto;
    height: 10vh;
    margin-top: 30px;
    margin-left: 20px;
  }
  .languageSelectorr{
    position: absolute;
    margin-top: 5px;
    margin-left: 40px;
    right: 60px;
/*
    top: 0%;
    left: 30%;
    margin-top: 15px;

    position: absolute; */
  }
  .infoButtonn{
    /*margin-top: 15px;
    margin-left: 15px; */

    display: grid;
    width: auto;
    height: 10vh;
    margin-top: 0px;
    margin-left: 20px;

  }
  #infoo{

  }




  </style>
