<template>


  <div class="itemPool">

    <div class="infoButton">
      <router-link :to="{ name: 'Rules', params: {} }"><img src="/images/question.png" width= "50"></router-link>
    </div>

    <div class="labell">
      <h3>{{ labels.buyCard }}</h3>
    </div>

    <div class="buy-cards">

      <div v-for="(card, index) in itemsOnSale" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="buyCard(card)"/>
        {{ cardCost(card) }}
      </div>
    </div>

    <div class ="bottles" >
      <div class="buttons" v-for="(p, index) in placement" :key="index">
        <button
        v-if="p.playerId===null"
        :class="[
        { itemdollar: p.id == 0 },
        { itemdollartwo: p.id == 1 },
        { itemdollarthree: p.id == 2 },
        ]"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)" >

        ${{p.cost}}
      </button>
      <div v-if="p.playerId !== null">
        {{p.playerId}}
      </div>
    </div>

  </div>

</div>
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'
export default {
  name: 'CollectorsBuyActions',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    itemsOnSale: Array,
    marketValues: Object,
    placement: Array
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      for(let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
        minCost = cost + this.marketValues[key]
      }
      return (this.player.money < minCost);
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit('placeBottle', p.id);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (this.marketValues[this.itemsOnSale[i].item] <= this.player.money - cost) {
          this.$set(this.itemsOnSale[i], "available", true);
        }
        else {
          this.$set(this.itemsOnSale[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (this.marketValues[this.player.hand[i].item] <= this.player.money - cost) {
          this.$set(this.player.hand[i], "available", true);
        }
        else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
      }
    },
    buyItem: function (card) {
      if (card.available) {
        this.$emit('buyItem', card)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.itemPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 10vh 20vh 20vh;
  grid-template-columns: 40vw 10vw;
  grid-template-areas:  "label infoButton"
                        "buy-cards buy-cards"
                        "bottles bottles";
}


.labell {
  grid-area: label;
}

.buy-cards {
  grid-area: buy-cards;
  display: grid;
  transform: scale(0.5) translate(-10%, -40%);
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}




.bottles {
  grid-area: bottles;

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

.buttons {

}

.infoButton {
  grid-area: infoButton;
  right: 50%;
}

.itemdollar {
  background-image: url("/images/itemdollar.png");
  height: 16vh;
  width: 8vw;
  border-radius: 15%;
  background-size: cover;
}

.itemdollartwo {
  background-image: url("/images/itemdollar2.png");
  height: 16vh;
  width: 8vw;
  border-radius: 15%;
  background-size: cover;
}

.itemdollarthree {
  background-image: url("/images/itemdollar3.png");
  height: 16vh;
  width: 8vw;
  border-radius: 15%;
  background-size: cover;
}

/*
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
}
.slot-wrapper {
  width: 100%;
}

.text-bubble {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width:2em;
  height:2em;
  right: 0.1em;
  bottom: 0.1em;
  border-radius: 2em;
  color: white;
  background-color: rgba(200, 0, 100, 0.7);
  border: 2px dotted yellow;
  box-shadow: -0.5em -0.1em 0.5em rgba(0,0,0,0.5);
}
*/
</style>
