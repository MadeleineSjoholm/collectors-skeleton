<template>
  <div>
    <div class="information">
      <div class="languageSelector">
        <div class="english" @click="language('en')"><img src="/images/english.png" width="40"></div>
        <div class="swedish" @click="language('se')"><img src="/images/swedish.png" width="40"></div>
      </div>
      <div class="infoButton" id="info" align="right">
        <router-link :to="{ name: 'Rules', params: {} }"><img src="/images/question.png" width= "60"></router-link>
        {{ labels.gameRules }}
      </div>
    </div>

    <div class="Collectors" align="center">
      <img src="/images/collectors.png">
      <h1>Collectors</h1>


      <h4>{{ labels.setUpGame }}</h4>
      <button class="buttonstart" id="startGame" type="start" @click="setupCollectors(2)">2 {{ labels.players }}</button><br>
      <button class="buttonstart" id="startGame" type="start" @click="setupCollectors(3)">3 {{ labels.players }}</button><br>
      <button class="buttonstart" id="startGame" type="start" @click="setupCollectors(4)">4 {{ labels.players }}</button><br>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
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
    setupCollectors: function (playerCount) {
      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: this.$store.state.lang });
        this.$router.push("/room/" + this.$store.state.roomId);
      },
      language: function (lang) {
        this.$store.commit('SET_LANG', lang);
        this.$store.state.socket.emit('getLabels', lang);
      },
    }
  }
  </script>
  <style>

  .information{
    display: grid;
    width: auto;
    height: 10vh;
    margin-top: 30px;
    margin-left: 20px;
  }

  .english{
    float: left;
  }
  .infoButton{
    position: absolute;
    margin-top: 5px;
    margin-right: 20px;
    right: 0px;
  }

  #info{
    width: 100px;
  }
  .collectors{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .buttonstart{
    border-radius: 12px;
    font-size: 17px;
    padding: 8px 10px;
    border: 2px solid white;
    background-color: rgba(212, 207, 207, 0.1);
    color: white;
  }
  button:hover {
    background-color: #B9B4B3;
  }

  canvas{
    display:block;
    width:100%;
    height:100%;
  }
  </style>
