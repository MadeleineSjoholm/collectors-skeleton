<template>
  <div class="marketPool">
    <h3 class="label">{{ labels.marketLabel }}</h3>

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

    {{chategory}}: {{value}}

  </div>

  <!--<div class="buttons2">
    <button @click="drawCard">
      {{ labels.draw }}
    </button>
  </div> -->

  <div class="changeValue">
    <button class="iconFastaval" @click="marketValues.fastaval+=1">
      Raise Fastaval
    </button>
    <button class="iconMovie" @click="marketValues.movie+=1">
      Raise Movie
    </button>
    <button class="iconTech" @click="marketValues.technology+=1">
      Raise Technology
    </button>
    <button class="iconFigures" @click="marketValues.figures+=1">
      Raise Figures
    </button>
    <button class="iconMusic" @click="marketValues.music+=1">
      Raise Music
    </button>
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
      if (this.skillsOnSale[i].x > 0) {
        this.$set(this.skillsOnSale[i], "available", true);
        break;
      }
      console.log(this.skillsOnSale);
    }

    /* kolla att x attribut finns innan for
    for (let i = 0; i < this.player.hand.length; i += 1) {
    this.$set(this.player.hand[i], "available", true);
  }
  this.chosenPlacementCost = cost;
},  */


},
},
}
</script>

<style scoped>
.marketPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 5vw 10vw 5vw 5vw;
  grid-template-columns: 1fr;
  grid-template-areas:   "label"
  "bottlePlacement" "value" "button"
  "icons"
  "counter"
  ;
}
.chategoryVal {
  grid-area: icons;
  grid-column: auto;
  grid-row: auto;

}
/*.chategoryVal {
grid-area: counter;
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
}*/
.changeValue {
   grid-area: value;
}
.label {
  grid-area: label;
  font-size: 2vw;
  margin-left: 1vw;
}
.doubleblueEnergy {
  background-image: url("/images/marketbluee.png");
  height: 12vh;
  width: 6vw;
  background-size: cover;
  border-radius: 15%;
}
.marketDollar {
  background-image: url("/images/dollarmarket.png");
  height: 12vh;
  width: 6vw;
  background-size: cover;
  border-radius: 15%;
}
.blueEnergy {
  background-image: url("/images/markeblue.png");
  height: 12vh;
  width: 6vw;
  background-size: cover;
  border-radius: 15%;
}
.bottlePlacement {
  /*grid-area: bottlePlacement;
  display: grid;
  grid-template-columns: repeat(auto-fill, 15vw);*/
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
.iconPlacement {
  grid-area: icons;
  display: grid;
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
.iconFastaval {
  background-image: url("/images/market2.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
  background-color:  rgb(137, 199, 214);
  width: auto;
  border:1px solid gray;
  border-radius:7%;
  font-size:0.875;
}
.iconMovie {
  background-image: url("/images/market3.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
  background-color:  rgb(137, 199, 214);
  width: auto;
  border:1px solid gray;
  border-radius:7%;
  font-size:0.875;
}
.iconTech {
  background-image: url("/images/market1.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
  background-color:  rgb(137, 199, 214);
  width: auto;
  border:1px solid gray;
  border-radius:7%;
  font-size:0.875;
}
.iconFigures {
  background-image: url("/images/market5.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
  background-color:  rgb(137, 199, 214);
  width: auto;
  border:1px solid gray;
  border-radius:7%;
  font-size:0.875;
}
.iconMusic {
  background-image: url("/images/market4.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
  background-color:  rgb(137, 199, 214);
  width: auto;
  border:1px solid gray;
  border-radius:7%;
  font-size:0.875;
}
.raiseValue{
  background-color: black;
  grid-area: raiseBid;
  display: grid;
  grid-template-columns: repeat(auto-fill, 8vw);
}

</style>
