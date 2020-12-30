<template>
  <div>
    <div class="auctionPool">
      <h3 class="label">{{ labels.auctionLabel }}</h3>
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
  </div>
 <!-- {{ auctionCards }} -->
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
  </div>
  <div class="cardToAuction">
    <CollectorsCard :card="upForAuction"/>
  </div>
  <div  class="raiseBid"> 
  {{ leadingBid }}
  {{ currentBid }}

    <button id="raiseButton" @click="currentBid += 1">
      +
    </button>
    <button id="submitBidButton" :disabled="player.money < currentBid" @click="submitCurrentBid()">
      Submit bid
    </button>
    <!-- <button id="resetButton" @click="currentBid">
      Reset your bid
    </button> -->
    <button id="passButton" @click="passBidding()">
      Pass
    </button>
  </div>
</div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "CollectorsAuctionActions",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    auctionCards: Array,
    upForAuction: Object,
    marketValues: Object,
    placement: Array,
    leadingBid: Object,
  
  },
  data: function () {
    return {
      currentBid: 0,
    }
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
  submitCurrentBid: function() {
     this.$emit('currentBid', this.currentBid);
  },
  passBidding: function() {
   //när alla players utom en tryckt pass, avslutas auktionen och vinnaren får kortet till playerboard
  },
  drawCard: function () {
  }

}
}
</script>

<style scoped>
.auctionPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 5vh 25vh;
  grid-template-columns: 1fr;
  grid-template-areas:  "label"
  "bottlePlacement"
  "auctionCards"
  "cardToAuction"
  "raiseBid";
}

.label {
  grid-area: label;

}
.auctionCards {
  grid-area: auctionCards;
  display: grid;
  grid-template-columns: repeat(auto-fill, 5vw);
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
  grid-area: cardToAuction;
  border-style: dotted;
  border-color: black;
  background-color: #ffff;
  height: 100px;
  width: 20px;



}
.doubleDollarEnergy {
  background-image: url("/images/auctiondollar2.png");
  height: 18vh;
  width: 10vw;
  background-size: cover;
  border-radius: 15%;
}
.dollarAuction {
  background-image: url("/images/auctiondollar.png");
  height: 18vh;
  width: 10vw;
  background-size: cover;
  border-radius: 15%;
}
.orangeEnergy {
  background-image: url("/images/auctionorange.png");
  height: 18vh;
  width: 10vw;
  background-size: cover;
  border-radius: 15%;
}
.bottlePlacement {
  grid-area: bottlePlacement;
  display: grid;
  grid-template-columns: repeat(auto-fill, 15vw);

}
.raiseBid{
  background-color: black;
grid-area: raiseBid;
display: grid;
  grid-template-columns: repeat(auto-fill, 8vw);
}
#submitBidButton {
    background-color: white;
    border-radius: 5px;
    border: 2px solid Blue
  }
#resetButton {
    background-color: white;
    border-radius: 5px;
    border: 2px solid Blue
  }  
  #raiseButton {
    background-color: rgb(135, 220, 241);
    width: 10vh;
    border: 2px solid Blue
  }  
  #passButton {
background-color: rgb(135, 220, 241);
    width: 10vh;
    border: 2px solid Blue
  }
</style>
