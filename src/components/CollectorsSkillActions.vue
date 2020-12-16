<template>
  <div>
    <div class="skillPool">
      <h3>{{ labels.skillLabel }}</h3>

      <div class="bottlePlacement">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :class="[
              { greenEnergy: p.cost == 0 },
              { dollarEnergy: p.cost == 1 },
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

    <div></div>
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
      this.$emit("placeBottle", p.cost);
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
.skill-cards,
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
}


.skillPool {
  grid-column: 1;
  grid-row: 1;
  height: 50%;
  background-color: #3399ff;
  display: flex;
}

.greenEnergy {
  background-image: url("/images/greenflaska.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}
.dollarEnergy {
  background-image: url("/images/dollarr.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}

.bottlePlacement {
  float: left;
  display: inline;
  width: 49%;
}
.skillCards {
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
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
</style>
