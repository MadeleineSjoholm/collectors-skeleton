<template>

<div>

      <h1>{{ labels.buyCard }}</h1>
      <div class="buy-cards">

        <div v-for="(card, index) in itemsOnSale" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="buyCard(card)"/>
          {{ cardCost(card) }}
        </div>
      </div>
      <div>
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId===null"
            :class="[
              { itemdollar: p.cost == 1 },
              { itemdollartwo: p.cost == 2 },
              { itemdollarthree: p.cost == 3 },
            ]"
            :disabled="cannotAfford(p.cost)"
            @click="placeBottle(p)" >

            ${{p.cost}}
          </button>
          <div v-if="p.playerId !== null">
            {{p.playerId}}
          </div>
        </div>
        <!-- <div class="placeBottle">
            <div class="itemdollar"></div>
            <div class="itemdollarone"></div>
            <div class="itemdollartwo"></div>
            <div class="itemdollar2"></div>
            <div class="itemdollarthree"></div>
        </div> -->
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
      this.$emit('placeBottle', p);
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
          this.chosenPlacementCost = cost;
        }
        else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
      }
    },
    buyCard: function (card) {
      if (card.available) {
        this.$emit('buyCard', card)
        this.highlightAvailableCards()
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    grid-template-rows: 30px -20px;
  }

  .buttons {
    display:inline-block;
    grid-template-columns: repeat(0px, 130px);
    grid-template-rows: 0px -20px;
  }

  /*.itemPool {

  padding-right: 10px;
  grid-column: 2 / span 4;
  grid-row: 1;
  background-color: #ccb3ff;
}

*/

.itemdollar {
  grid-column: 2;
  grid-row: 1;
  flex: 20%;

  background-image: url("/images/itemdollar.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}

/*
.itemdollarone {
  grid-column: 2;
  grid-row:2;
  flex: 20%;

  background-image: url("/images/itemdollar.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}

*/

.itemdollartwo {
  grid-column: 3;
  grid-row:2;
  flex: 20%;

  background-image: url("/images/itemdollar2.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}
 /*
.itemdollar2 {
  grid-column: 2;
  flex: 20%;

  background-image: url("/images/itemdollar2.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}
*/

.itemdollarthree {
  grid-column: 5;
  flex: 20%;

  background-image: url("/images/itemdollar3.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}




</style>
