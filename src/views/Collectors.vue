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
            <h1> Auction </h1>
            <div class="buttons2">
              <!-- denna är tillagd -->

              <button @click="drawCard">
                {{ labels.draw }}
              </button>
            </div>
            <div class="auctionCards">
              <CollectorsCard
                v-for="(card, index) in auctionCards"
                :card="card"
                :key="index"
              />
            </div>
            <div class="bottlePlacement">
              <div class="doubleDollarEnergy"></div>
              <div class="dollarAuction"></div>
              <div class="orangeEnergy"></div>
              <div class="orangeEnergy"></div>
            </div>
          </div>
          
          <div class="itemPool">
            <div class="itemPoolcontent">
            <h1> Item </h1>
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
            <div class="itemdollar"></div>
            <div class="itemdollarone"></div>
            <div class="itemdollartwo"></div>
            <div class="itemdollar2"></div>
            <div class="itemdollarthree"></div>

          </div>

          <div class="marketPool">
            <CollectorsMarket
              v-if="players[playerId]"
              :labels="labels"
              :player="players[playerId]"
          
              :marketValues="marketValues"
              :placement="marketPlacement"
              @placeCard="placeCard($event)"
              @placeBottle="placeBottle('market', $event)"
            />
<!--:itemsOnSale="itemsOnSale" -->

            </div>

          <div class="workPool">
            <h1> Work </h1>
          </div>
          </div>

          <div class="footer">
            <div class="playerHand">PLAYERHAND {{ playerId }}</div>

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
        </div>
      

      {{ buyPlacement }} {{ chosenPlacementCost }}

      

      <!--
      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>

      -->
<!--
      <div class="buttons2">
          <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      Auction
      <div class="cardslots">
        <CollectorsCard
        v-for="(card, index) in auctionCards"
        :card="card"
        :key="index"
        />
      </div>
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

    </main>

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
//import CollectorsMarketActions from "@/components/CollectorsMarketActions.vue";

//import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsSkillActions,
   // CollectorsMarketActions,
   // Sidebar,
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0, y: 0 },
      labels: {},
      players: {},
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
      chosenPlacementCost: null,
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
    placeBottle: function (action, cost) {
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
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
  },
};
</script>
<style scoped>
header {
  user-select: none;
  position: fixed;
  width: 100%;
  pointer-events: none;
}
main {
  user-select: none;
}
.table {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #b3ffff;
}
.board {
  display: grid;
  background-color: #6699ff;
  width: auto;
  height: 100vh;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}

.itemPool {
  padding-right: 10px;
  grid-column: 2 / span 4;
  grid-row: 1;
  background-color: #ccb3ff;
}

.itemPoolcontent {
grid-column:1 / span 5;
grid-row: 1 ;


}

.itemdollar{
  grid-column:1;
  grid-row:2;
  flex: 20%;

  background-image: url("/images/itemdollar.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;

}

.itemdollarone{
  grid-column:2 ;
  flex: 20%;

  background-image: url("/images/itemdollar.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}

.itemdollartwo{
  grid-column: 3;
  flex: 20%;

  background-image: url("/images/itemdollar2.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;

}

.itemdollar2{
  grid-column: 4;
  flex: 20%;

  background-image: url("/images/itemdollar2.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;

}

.itemdollarthree{
  grid-column:5;
  flex: 20%;

  background-image: url("/images/itemdollar3.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;

}


.skillPool {
  grid-column: 1;
  grid-row: 1 / span 5;
  background-color: #bb99ff;
  display: flex;
}
/*.skillPool {
  grid-column: 1;
  grid-row: 1 / span 5;
  background-color: #3399ff;
  display: flex; */
  /* grid-gap: 0.5rem; */
  /* column-gap: 0.5rem;*/
  /* row-gap: 0.5rem;*/
  /*grid-template-columns: repeat(auto-fill, 50px);
} */
.workPool {
  grid-column: 2 / span 2;
  grid-row: 2 / span 3;
  background-color: #80ffff;
}
.marketPool {
  grid-column: 2 / span 4;
  grid-row: 5;
  background-color: #4d4dff;
}
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
/*.greenEnergy {
  background-image: url("/images/greenflaska.png");
  height: 20vh;
  width: 10vw;
  background-size: cover;
}
.dollarEnergy {
  background-image: url("/images/dollar.png");
  height: 20vh;
  width: 9.5vw;
  background-size: cover;
} */
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
/*.skillCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.skillCards div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.skillCards div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
*/

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
  grid-column: 2 / span 2;
  grid-row: 15 / span 3;
  background-color: #99ccff;
}
.playerHand {
  grid-column: 2 / span 2;
  grid-row: 6;
  background-color: #b366ff;
  height: 100%;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 80%;
  width: 20%;
  margin-right: 40%;
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
@media screen and (max-width: 800px) {
  main {
    width: 90vw;
  }
}
</style>