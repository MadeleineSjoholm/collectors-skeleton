<template>
<div>
    <div class="auctionPool">
      <h3>{{ labels.auctionLabel }}</h3>
      <div class="bottlePlacement">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :class="[
              { doubleDollarEnergy: p.id == 5 },
              { dollarAuction: p.id == 6 },
              { orangeEnergy: p.id == 7 },
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

      <div class="buttons2">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      <div class="auctionCards">
        <CollectorsCard
          v-for="(card, index) in auctionCards"
          :card="card"
          :key="index"
          :availableAction="card.available"
          @doAction="initiateAuction(card)"
        />
        />
      </div>
      <div class="cardToAuction"> 
         <CollectorsCard :card="cardsUpForAuction"/>
      </div>
    </div>
</div>
</template>

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
    auctionCards: Array,
    cardsUpForAuction: Array, 
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
     for (let i = 0; i < this.auctionCards.length; i += 1) {
        this.$set(this.auctionCards[i], "available", true);
        /* if marketvalues 
        if (this.skillsOnSale[i].x > 0) {                  
          this.$set(this.skillsOnSale[i], "available", true);
          break;
        }    */
      }
    },
    initiateAuction: function(card) {
      if (card.available) {
        this.$emit('initiateAuction', card);
        this.highlightAvailableCards()
      }
    },
  },
};
</script> -->
<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.auctionPool {
  grid-column: 4 / span 2;
  grid-row: 2 / span 3; 
  background-color: #99ccff;
}
.auctionCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.auctionCards div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.auctionCards div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
.cardToAuction {
    border-style: dotted;
    border-color: black;
    background-color: #ffffcc;
    width: 150px;
    height: 200px;
}
.doubleDollarEnergy {
  background-image: url("/images/auctiondollar2.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.dollarAuction {
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