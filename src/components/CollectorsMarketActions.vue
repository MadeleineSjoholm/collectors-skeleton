<template>
    <div class="marketPool">
      <h3>{{ labels.marketLabel }}</h3>
       <div class="iconPlacement">
      <div class="iconFastaval"></div>
      <div class="iconMovie"></div>
      <div class="iconTech"></div>
      <div class="iconFigures"></div>
      <div class="iconMusic"></div>
      </div>
      <div class="bottlePlacement">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :class="[
              { doubleblueEnergy: p.id == 8 },
              { marketDollar: p.id == 9 },
              { blueEnergy: p.id == 10 },
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
      
        {{chategory}}: <br>
        {{value}}
      
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
      this.$emit("placeBottle", p);
      this.highlightAvailableCards();
    },
    highlightAvailableCards: function () {
      for (let i = this.skillsOnSale.length -1; i >= 0; i -= 1) {
        this.$set(this.skillsOnSale[i], "available", true); 
        break;
      }
      /* kolla att x attribut finns innan for
      for (let i = 0; i < this.player.hand.length; i += 1) {
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
.iconPlacement {
  float: right;
  display: inline;
  width: 49%;
}
.iconFastaval {
  background-image: url("/images/market2.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.iconMovie {
  background-image: url("/images/market3.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.iconTech {
  background-image: url("/images/market1.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.iconFigures {
  background-image: url("/images/market5.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.iconMusic {
  background-image: url("/images/market4.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
</style>

-->