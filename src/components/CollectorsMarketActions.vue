<template>
  <div>
    <div class="marketPool">
      <h1>Market</h1>
      <div class="bottlePlacement">
        <div class="doubleblueEnergy"></div>
        <div class="marketDollar"></div>
        <div class="blueEnergy"></div>
      </div>
    </div>
  </div>
</template>
<!--
<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
export default {
  name: "CollectorsMarketActions",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    //skillsOnSale: Array,
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
      for (let i = 0; i < this.marketOnSale.length; i += 1) {
        this.$set(this.marketOnSale[i], "available", true);
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }
      //  this.chosenPlacementCost = cost;
    },
    marketCard: function (card) {
      if (card.available) {
        this.$emit("marketCard", card);
        this.highlightAvailableCards();
      }
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
.doubleDollarEnergy {
  background-image: url("/images/auctiondollar2.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.dollarEnergy {
  background-image: url("/images/auctiondollar.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.orangeEnergy {
  background-image: url("/images/auctionorange.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}

.bottlePlacement {
  float: left;
  display: inline;
  width: 49%;
}
</style>

-->