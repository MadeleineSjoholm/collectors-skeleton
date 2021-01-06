<template>
  <div>

    <div class="infoButtonn" id="infoo">
        <router-link :to="{ name: 'Home', params: {} }"><img src="/images/pil.png" width= "60" ></router-link>
        {{ labels.homepage }}
    </div>
    <div class="backToGameButton" id="infoo">
        <router-link :to="{ name: 'Collectors', params: {} }"><img src="/images/pil.png" width= "60" ></router-link>
        {{ labels.homepage }}
    </div>

        <div class="languageSelectorr">
          <div class="english" @click="language('en')"><img src="/images/english.png" width="40"></div>
          <div class="swedish" @click="language('se')"><img src="/images/swedish.png" width="40"></div>
        </div>

    <div class="itemInfo">
      <h1>Item</h1>
    </div>
    <div class="skillInfo">
      <h1>Skills</h1>
      <h3>Special Skills</h3>

      <p>{{ labels.workDollar }}</p>
      <p>{{ labels.workCard }}</p>
      <p>{{ labels.skillBottle }}</p>
      <p>{{ labels.skillDollar }}</p>
      <p>{{ labels.skillStar }}</p>
      <p>{{ labels.skillStars }}</p>
    </div>
    <div class="workInfo">
      <h1>Work</h1>
    </div>
    <div class="auctionInfo">
      <h1>Auction</h1>
    </div>
    <div class="marketInfo">
      <h1>Market</h1>
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

  .backToGameButton{
    float: right;
    top: 0%;
    right: 0%;
    margin-top: 15px;
    margin-right: 15px;
    position: absolute;
  }
  .languageSelectorr{

    top: 0%;
    left: 30%;
    margin-top: 15px;

    position: absolute;
  }
  .infoButtonn{
    margin-top: 15px;
    margin-left: 15px;


  }
  #infoo{

  }




  </style>
