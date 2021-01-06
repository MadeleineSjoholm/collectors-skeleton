<template>

  <div class="skillPool">
    <div class="label">
      <h3>{{ labels.skillLabel }}</h3>
    </div>
    <div class="bottlePlacement">
      <div class="buttons" v-for="(p, index) in placement" :key="index">

        <button

        v-if="p.playerId === null"
        :class="[
        { greenEnergy: p.id == 3 },
        { dollarEnergy: p.id == 4 },
        ]"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)"
        >

        ${{ p.cost }}

      </button>


      <div v-if="p.playerId !== null">
        {{ p.playerId }}
      </div>
    </div>
  </div>

  <div class="skillCards">
    <CollectorsCard
    v-for="(card, index) in skillsOnSale"
    :card="card"
    :availableAction="card.available"
    :key="index"
    @doAction="skillsCard(card)"
    />
  </div>
</div>

</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
export default {
  name: "CollectorsSkillActions",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    marketValues: Object,
    placement: Array,
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      for (let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
        minCost = cost + this.marketValues[key];
      }
      return this.player.money < minCost;
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p);
      this.highlightAvailableCards();
    },
    highlightAvailableCards: function () {
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        this.$set(this.skillsOnSale[i], "available", true);
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }
      //  this.chosenPlacementCost = cost;
    },
    skillsCard: function (card) {
      if (card.available) {
        this.$emit("skillsCard", card);
        this.highlightAvailableCards();
      }
    },
  },

};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skillPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 5vh 15vh 35vh;
  grid-template-columns: 1fr;
  grid-template-areas:  "label"
  "skillCards"
  "bottlePlacement";
}

.label {
  grid-area: label;
}

.buttons {

}

.greenEnergy {
  background-image: url("/images/greenflaska.png");
  height: 16vh;
  width: 8vw;
  background-size: cover;
  border-radius: 15%;

}
.dollarEnergy {
  background-image: url("/images/dollarr.png");
  height: 16vh;
  width: 8vw;
  background-size: cover;
  border-radius: 15%;
}
.bottlePlacement {
  grid-area: bottlePlacement;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display:   -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;


}
.skillCards {
  grid-area: skillCards;
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.skillCards div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.skillCards div:hover {
  transform: scale(0.5) translate(-25%, 0);
  z-index: 1;
}
</style>
