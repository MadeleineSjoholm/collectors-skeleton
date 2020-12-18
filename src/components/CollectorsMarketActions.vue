<template>
    <div class="marketPool">
      <h3>{{ labels.marketLabel }}</h3>
      <div class="bottlePlacement">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :class="[
              { doubleblueEnergy: p.cost == 0 },
              { marketDollar: p.cost == -2 },
              { blueEnergy: p.cost == 0 },
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
      <div class="chategoryVal" v-for="(value,chategory) in marketValues" :key = "chategory">
      <div>
        {{chategory}}: <br>
        {{value}}
      </div>
    </div>
    </div>
</template>

<script>
//import CollectorsCard from "@/components/CollectorsCard.vue";
export default {
  name: "CollectorsMarketActions",
  /*components: {
    CollectorsCard, //kommentera bort hela?
  }, */
  props: {
    labels: Object,
    player: Object,
    market: Array,
    skillsOnSale: Array, //?? + auction??
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
      for (let i = this.skillsOnSale.length -1; i >= 0; i -= 1) {
        this.$set(this.marketOnSale[i], "available", true);
      }
      /*for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }
        this.chosenPlacementCost = cost;
    },  */
        
   
    },
  },
};
</script> -->
<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.marketPool {
  grid-column: 2 / span 4;
  grid-row: 5;
  background-color: #4d4dff;
}
.doubleblueEnergy {
  background-image: url("/images/marketbluee.png");
  height: 20vh;
  width: 12vw;
  background-size: cover;
}
.marketDollar {
  background-image: url("/images/dollarmarket.png");
  height: 20vh;
  width: 12vw;
  background-size: cover;
}
.blueEnergy {
  background-image: url("/images/markeblue.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}
.bottlePlacement {
  float: left;
  display: inline;
  width: 49%;
}
</style>

-->