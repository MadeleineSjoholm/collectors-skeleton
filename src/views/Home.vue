<template>
  <div>
    <div class="information">
      <div class="languageSelector">
          <div class="english"><img src="/images/english.png" width="40"></div>
          <div class="swedish>"><img src="/images/swedish.png" width="40"></div>
      </div>
      <div class="infoButton" id="info" align="right">
          <img src="/images/question.png" width= "60"><br>
          Game Rules
      </div>
    </div>

    <div class="Collectors" align="center">
          <img src="/images/collectors.png">
          <h1>Collectors</h1>
    </div>

    <div class="center" align="center">
      <ul>
        <div v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'en')">Set up a game of Collectors for {{i+1}} players
          </a>.
        </div>
      </ul>
      <ul>
        <div v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'se')">Spela Collectors med {{i+1}} spelare</a>.
        </div>
      </ul>

      <button id="startGame" type="start">Start Game!</button>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    setupCollectors: function (playerCount, lang="en") {
      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang });
      this.$router.push("/room/" + this.$store.state.roomId);
    },
    /*
    setupLanguage: function(lang) {

    } */
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
  .swedish{
    float: right;
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
  .center {
  /*  display: flex; */
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;
  }
</style>
