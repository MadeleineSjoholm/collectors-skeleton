<template>
  <div>
    <h3 class="workLabel">
      {{ labels.workLabel }}
    </h3>
    <div class="workPlacement">
      <button
        :disabled="player.hand.length < 2"
        v-if="round == 1 && placement[0].playerId === null"
        @click="placeBottle(0)"
      >
        {{ labels.work1 }}
      </button>
      <button
        :disabled="player.hand.length < 2"
        v-if="round == 2 && placement[1].playerId === null"
        @click="placeBottle(1)"
      >
        {{ labels.work2 }}
      </button>
      <button
        :disabled="player.hand.length < 2"
        v-if="round == 3 && placement[2].playerId === null"
        @click="placeBottle(2)"
      >
        {{ labels.work3 }}
      </button>
      <button
        :disabled="player.hand.length < 2"
        v-if="round == 4 && placement[3].playerId === null"
        @click="placeBottle(3)"
      >
        {{ labels.work4 }}
      </button>
      <button @click="placeBottle(4)">
        {{ labels.work5 }}
      </button>
      <button
        v-if="placement[5] && placement[5].playerId === null"
        @click="placeBottle(5)"
        :disabled="cannotAfford(1)"
      >
        {{ labels.work6 }}
      </button>
      <button
        v-if="placement[6] && placement[6].playerId === null"
        @click="placeBottle(6)"
      >
        {{ labels.work7 }}
      </button>
      <button
        v-if="placement[7] && placement[7].playerId === null"
        @click="placeBottle(7)"
      >
        {{ labels.work8 }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CollectorsWorkActions",
  components: {},
  props: {
    round: Number,
    labels: Object,
    placement: Array,
    player: Object,
  },
  methods: {
    placeBottle: function (id) {
      this.$emit("placeBottle", id);
    },
    cannotAfford: function (cost) {
      return this.player.money < cost;
    },
  },
};
</script>


<style scoped>
.workPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 15vw 5vw 5vw 5vw 5vw;
  grid-template-columns: 1fr;
  grid-template-areas:
    "label"
    "WorkPlacement";
}
.workLabel {
  grid-area: label;
  font-size: 1.5vw;
  margin-left: 1vw;
}
button {
  grid-area: test;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
}
@media (max-width: 800px) {
  .workLabel {
    font-size: 100%;
  }
}
</style>
