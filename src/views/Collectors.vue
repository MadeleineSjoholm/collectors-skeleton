<template>
  <div>
    <main>
      <div class="table">
        <div class="board">

          <div class="skillPool">
            <CollectorsSkillActions
              v-if="players[playerId]"
              :labels="labels"
              :player="players[playerId]"
              :skillsOnSale="skillsOnSale"
              :marketValues="marketValues"
              :placement="skillPlacement"
              @skillsCard="skillsCard($event)"
              @placeBottle="placeBottle('skill', $event)"
            />
          </div>

          <div class="auctionPool">
           <!-- lägg till vems tur -->
            <CollectorsAuctionActions
                v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :auctionCards="auctionCards"
                :marketValues="marketValues"
                :placement="auctionPlacement"
                :upForAuction="upForAuction"
                @initiateAuction="handleEvent($event)"
                @placeBottle="placeBottle('auction', $event)"
              />
          </div>

          <div class="itemPool">
            <div class="itemPoolcontent">
              <CollectorsBuyActions
                v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :itemsOnSale="itemsOnSale"
                :marketValues="marketValues"
                :placement="buyPlacement"
                @buyCard="buyCard($event)"
                @placeBottle="placeBottle('buy', $event)"
              />
            </div>
          </div>

          <div class="marketPool">
            <CollectorsMarketActions
              v-if="players[playerId]"
              :labels="labels"
              :player="players[playerId]"
              :marketValues="marketValues"
              :placement="marketPlacement"
              :market="market"
              @marketEvent="marketEvent($event)"
              @placeBottle="placeBottle('market', $event)"
            />
            <!--:itemsOnSale="itemsOnSale" -->
          </div>

          <div class="workPool">
            <h1>Work</h1>
                <div class="quarterTiles" align="center">
                </div>
                <div class="workDollarWhite"></div>
                <div class="workDollarBlack"></div>
                <div class="energyBottle"></div>
                <div class="energyBottle"></div>
          </div>
        </div>

        <div class="player">
          <div class="playerHand">
            PLAYERHAND {{ playerId }}
            <!--
      Hand
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard
        v-for="(card, index) in players[playerId].hand"
        :card="card"
        :availableAction="card.available"
        @doAction="buyCard(card)"
        :key="index"
        />
      </div>
      -->
          </div>

          <div class="playerItem">
            PLAYERITEM

            <div class="PlayerBoardCards" v-if="players[playerId]">
              <CollectorsCard
                v-for="(card, index) in players[playerId].items"
                :card="card"
                :key="index"
              />
            </div>
            player skills
            <div class="PlayerBoardCards" v-if="players[playerId]">
              <CollectorsCard
                v-for="(card, index) in players[playerId].skills"
                :card="card"
                :key="index"
              />
            </div>
          </div>
        </div>

<!-- ny spelare -->

<div class="player1">
  <div class="playersHands">
    PLAYER 1 {{ playerId }}

  </div>

  <div class="playerItem">
    PLAYER1 ITEM

    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].items"
        :card="card"
        :key="index"
      />
    </div>
    player skills
    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].skills"
        :card="card"
        :key="index"
      />
    </div>
  </div>
</div>

<!-- ny spelare -->

<div class="player2">
  <div class="playersHands">
    PLAYER 2 {{ playerId }}

  </div>

  <div class="playerItem">
    PLAYER 2 ITEM

    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].items"
        :card="card"
        :key="index"
      />
    </div>
    player skills
    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].skills"
        :card="card"
        :key="index"
      />
    </div>
  </div>
</div>

<!-- ny spelare -->

<div class="player3">
  <div class="playersHands">
    PLAYER 3 {{ playerId }}

  </div>

  <div class="playerItem">
    PLAYER3 ITEM

    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].items"
        :card="card"
        :key="index"
      />
    </div>
    player skills
    <div class="PlayerBoardCards" v-if="players[playerId]">
      <CollectorsCard
        v-for="(card, index) in players[playerId].skills"
        :card="card"
        :key="index"
      />
    </div>
  </div>
</div>


        </div>


<!--
      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>

      -->
    </main>

    {{ buyPlacement }} {{ chosenPlacementCost }}
    {{ players }}
    {{ marketValues }}
    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>

    <footer>
      <p>
        {{ labels.invite }}
        <input
          type="text"
          :value="publicPath + $route.path"
          @click="selectAll"
          readonly="readonly"
        />
      </p>
    </footer>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBuyActions from "@/components/CollectorsBuyActions.vue";
import CollectorsSkillActions from "@/components/CollectorsSkillActions.vue";
import CollectorsMarketActions from "@/components/CollectorsMarketActions.vue";
import CollectorsAuctionActions from "@/components/CollectorsAuctionActions.vue";


//import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsSkillActions,
    CollectorsMarketActions,
    CollectorsAuctionActions
    // Sidebar,
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0, y: 0 },
      labels: {},
      players: {},
      market: [],
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      // }
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      upForAuction: {},
      chosenPlacementCost: null,
      chosenAction: null,
      marketValues: {
        fastaval: 0,
        movie: 0,
        technology: 0,
        figures: 0,
        music: 0,
      },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      playerid: 0,
    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  watch: {
    players: function (newP, oldP) {
      console.log(newP, oldP);
      for (let p in this.players) {
        for (let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
            this.$set(this.players[p].hand[c], "available", false);
        }
      }
    },
  },
  created: function () {
    this.$store.commit("SET_PLAYER_ID", this.$route.query.id);
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);
    this.$store.state.socket.emit("collectorsLoaded", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
    });
    this.$store.state.socket.on(
      "collectorsInitialize",
      function (d) {
        this.labels = d.labels;
        this.players = d.players;
        this.market = d.market;
        this.itemsOnSale = d.itemsOnSale;
        this.marketValues = d.marketValues;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsPointsUpdated",
      (d) => (this.points = d)
    );
    this.$store.state.socket.on(
      "collectorsCardDrawn",
      function (d) {
        //this has been refactored to not single out one player's cards
        //better to update the state of all cards
        this.players = d;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsCardBought",
      function (d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsAuctionStarted",
      function (d) {
        console.log(d.playerId, "Initiated auction");
        this.players = d.players;
        this.upForAuction = d.upForAuction;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsSkillBought",
      function (d) {
        console.log(d.playerId, "bought a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
      }.bind(this)
    );
  },
  

  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (action, p) {
      this.chosenPlacementCost = p.cost;
      this.chosenAction = action;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        id: p.id,
      });
    },
    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    buyCard: function (card) {
      console.log("buyCard", card);
      this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    skillsCard: function (card) {
      console.log("skillsCard", card);
      this.$store.state.socket.emit("collectorsSkillsCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.chosenPlacementCost,
      });
    },
    handleEvent: function (card) {
      if (this.chosenAction === "buy") {
        this.buyCard(card)
      }
      if (this.chosenAction === "skill") {
        this.skillsCard(card)
      }
      if (this.chosenAction === "auction") {
        this.auctionCard(card)
      }
      if (this.chosenAction === "market") {
        this.marketCards(card)
      }
    } 
  },
};
</script>
<style scoped>
header {
/*  user-select: none;
  position: fixed;
  width: 100%;
  pointer-events: none; */
}
main {
  /*user-select: none;*/
}
.table {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffff;
}
.board {
  box-sizing: border-box;     /*huvudgriden, hänvisa till kod här*/
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 1fr 1fr 1fr 2fr);
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "itemPool itemPool"
                       "skillPool skillPool"
                       "marketPool marketPool"
                       "workPool auctionPool";
}
  @media (max-width: 600px) { /*För mindre skärmar*/
      grid-gap: 2px;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: 1fr;
      grid-template-areas: "itemPool "
                           "skillPool"
                           "marketPool"
                           "workPool "
                           "auctionPool";
}

.itemPool {
  grid-area: itemPool;
  background-color: #ffb3b3;
  max-height: 80vh;

}
.skillPool {
  grid-area: skillPool;
  background-color: #c2f0c2;
  max-height: 50vh;

}
.workPool {
  grid-area: workPool;
  background-color: #ffe6b3;
  max-height: 100vh;
}
.marketPool {
  grid-area: marketPool;
  background-color: #66a3ff;
  max-height: 40vh;
}
.auctionPool {
  grid-area: auctionPool;
  background-color: #ecd9c6;
  max-height: 100vh;
}
.bottlePlacement {
  /*float: left;
  display: inline;
  width: 49%;*/
}

.quarterTiles{
    border-style: dotted;
    border-color: black;
    background-color: #ffff;
    width: 50%;
    height: 10%;
}

.workDollarWhite{
  background-image: url("/images/auctionvit.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;

}
.workDollarBlack{
  background-image: url("/images/auctionblack.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.energyBottle{
  background-image: url("/images/flaska.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
}
.PlayerBoardCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.PlayerBoardCards div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.PlayerBoardCards div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
.playerItem {
  display: none;
  background-color: #b3ecff;
}

.playersHands {
  background-color: #80dfff;
  height: 100%;
}

.playersHands:hover + .playerItem {
  display: block
}

.playerHand {
  background-color: #e6ccff
;
  height: 100%;
}
.playerHand:hover + .playerItem {
  display: block
}

.player {
  position:fixed;
  right:0%;
  top:0%;
  width: 25vw;
  height: 4vh;
}

/*spelare1*/


.player1 {
  position:fixed;
  right:25%;
  top:0%;
  width: 25vw;
  height: 4vh;
}

/*spelare2*/

.player2 {
  position:fixed;
  right:50%;
  top:0%;
  width: 25vw;
  height: 4vh;
}

/*spelare2*/

.player3 {
  position:fixed;
  right:75%;
  top:0%;
  width: 25vw;
  height: 4vh;
}


footer {
  margin-top: 5em auto;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color: ivory;
}
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
  /*column-gap: 10px;*/
}
.cardslots div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
/* @media screen and (max-width: 800px) {
  main {
    width: 90vw;
  }
}*/
</style>
