<template>
  <div>
    <div class="auctionPool">
      <h3 class="label">{{ labels.auctionLabel }} </h3>
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
      <div class="buttons2">
         <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
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


  <!--  <div>
   <button
        class="payHandButton"
        v-if="players[playerId]"
        @click="payWithHand()"
      >Payment from hand</button>
      <div class="payHand">
        <CollectorsCard
          v-for="(card, index) in players[playerId].hand"
          :card="card"
          :availableAction="card.available"
          @doAction="bidWithHand(card)"
          :key="index"
        />
      </div>
  </div>
  lägg till i methods osv
  -->

  <div  class="raiseBid">
 {{ labels.leadingLabel }} {{ leadingBid.bid }} <br>
 {{ labels.leadingPlayer }} {{ leadingBid.playerId }} <br>

  {{ labels.ownBid }}: {{ currentBid }}
 <button class="bidButton" @click="currentBid -= 1">
      -
    </button>
    <button id="submitBidButton" :disabled="player.money < currentBid || currentBid < leadingBid + 1" @click="submitCurrentBid()">
      {{ labels.subBid }} (<strong>{{ currentBid }}</strong>)
    </button>
    <button class="bidButton" @click="currentBid += 1">
      +
    </button>
    <button class="bidButton" @click="passBidding()">
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
    //return this.inAuction = false;
    this.$emit('passBidding', this.upForAuction);
   //när alla players utom en tryckt pass, avslutas auktionen och vinnaren får kortet till playerboard
  },
  drawCard: function (card) {

    this.$emit('drawCard', card);
  }
}
}
</script>

<style scoped>
.auctionPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 5vh 25vh 20vh 5vh;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:  "label label"
  "bottlePlacement bottlePlacement"
  "auctionCards cardToAuction"
  /*"cardToAuction cardToAuction"*/
  "raiseBid raiseBid";
}

.label {
  grid-area: label;
  font-size: 2vw;
  margin-left: 1vw;

}
.auctionCards {
  grid-area: auctionCards;
  display: grid;
  grid-template-columns: repeat(auto-fill, 10vw);
  grid-template-rows: repeat(auto-fill, 25vh);

}
.auctionCards div {
  transform: scale(0.7) translate(0%, -20%);
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
   transform: scale(0.25) translate(-60%, -150%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
  height: 70vh;
  width: 50vh;
  background-image: url("/images/auction.png");

}
.doubleDollarEnergy {
  background-image: url("/images/auctiondollar2.png");
  height: 12vh;
  width: 6vw;
  background-size: cover;
  border-radius: 15%;
}
.dollarAuction {
  background-image: url("/images/auctiondollar.png");
  height: 12vh;
  width: 6vw;
  background-size: cover;
  border-radius: 15%;
}
.orangeEnergy {
  background-image: url("/images/auctionorange.png");
  height: 12vh;
  width: 6.45vw;
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
.raiseBid{
  background-color: #ecd9c6;
  grid-area: raiseBid;
  display: grid;
  grid-template-columns: repeat(auto-fill, 10vw);
}

.bidButton {
    background-color: white;
    width: auto;

    border:2px solid rgb(216, 70, 70);
    border-radius:7%;
    word-wrap: break-word;
    font-size:0.5;
  }
  .changeBidButton {
    background-color: rgb(137, 199, 214);
    width: auto;
    border:1px solid gray;
    border-radius:7%;

    font-size:0.875;
  }
</style>
