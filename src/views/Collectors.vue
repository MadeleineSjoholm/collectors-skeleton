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
            <CollectorsAuctionActions
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="auctionPlacement"
            :upForAuction="upForAuction"
            :leadingBid="leadingBid"
            @drawCard="drawCard($event)"
            @initiateAuction="handleEvent($event)"
            @passBidding="passBidding($event)"
            @currentBid="currentBid($event)"
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
          </div>

          <div class="workPool">
            <CollectorsWorkActions
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="workPlacement"
            @placeBottle="placeBottle('market', $event)"
            />
          </div>
        </div>

        <div class="clickable" @click="togglePlayerBoard('player')">
          YOUR PLAYERHAND
        </div>

        <div :class="['player', { ishidden: isHidden('player') }]">
          <div class="playerHand">
            {{ labels.playerID}} {{ playerId }}<br/>

            <div class="money">
              <div class="column">
                <div v-if="players[playerId]" @click="players[playerId].money += 1" ><img src="/images/mynt.png" width="50"></div>
                <span v-if="players[playerId]"> {{ players[playerId].money }} </span>
              </div>
              <div class="column">
                <div v-if="players[playerId]" @click="players[playerId].bottles += 1"><img src="/images/flskaa.png" width="50"></div>
                <span v-if="players[playerId]"> {{ players[playerId].bottles }} </span> <br>
              </div>
              <div class="column">
                <div v-if="players[playerId]" @click="players[playerId].points += 1"><img src="/images/collectorpoints.png" width="50"></div>
                <span v-if="players[playerId]"> {{ players[playerId].points }} </span> <br>
              </div>
            </div>
            {{ labels.hand }}
            <div class="cardslots-wrapper">
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard
                v-for="(card, index) in players[playerId].hand"
                :card="card"
                :key="index"
                />
              </div>
            </div>

            {{ labels.playerItem }}
            <div class="PlayerBoardCards" v-if="players[playerId]">
              <CollectorsCard
              v-for="(card, index) in players[playerId].items"
              :card="card"
              :key="index"
              />
            </div>

            {{ labels.playerSkills}}
            <div class="PlayerBoardCardss" v-if="players[playerId]">
              <CollectorsCard
              v-for="(card, index) in players[playerId].skills"
              :card="card"
              :key="index"
              />
            </div>

          </div>
        </div>

        <div class="test" >
          <div class="clickable1">
            <div v-for="(player, pid) in otherPlayers"  :key="pid" @click="togglePlayerBoard(pid)" >
              <div v-if="pid!=playerId">
                <div> {{labels.opponent }} </div>

                <div :class="['playerTest', {'ishidden' : isHidden(pid)}]">
                  <div class="playerHands">
                    {{ labels.playerID}} {{ pid }}

                    {{ labels.playerItem }}
                    <div class="PlayerBoardCards">
                      <CollectorsCard
                      v-for="(card, index) in player.items"
                      :card="card"
                      :key="index"
                      />
                    </div>

                    {{ labels.playerItem }}
                    <div class="PlayerBoardCards">
                      <CollectorsCard
                      v-for="(card, index) in player.skills"
                      :card="card"
                      :key="index"
                      />
                    </div>
                    Bottles: <span v-if="players[pid]"> {{ players[pid].bottles }} </span>
                    Money: <span v-if="players[pid]"> {{ players[pid].money }} </span>
                    Points: <span v-if="players[pid]"> {{ players[pid].points }} </span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
import CollectorsWorkActions from '@/components/CollectorsWorkActions.vue'

export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsSkillActions,
    CollectorsMarketActions,
    CollectorsAuctionActions,
    CollectorsWorkActions
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
      round: 0,
      actingPlayer: null,
      workPlacement: [],
      numberOfActions: 0,
      showPlayerBoard: "",
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      upForAuction: {},
      inAuction: true,
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
      leadingBid: { bid: null, playerId: null },
    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
    keyPlayersId: function () {
      return Object.keys(this.players);
    },
    otherPlayers: function () {
      let otherPlayers = {};
      for (let playerId in this.players) {
        if (playerId !== this.playerId) {
          otherPlayers[playerId] = this.players[playerId];
        }
      }
      return otherPlayers;
    }
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
        this.round = d.players;
        this.playOrder = d.playOrder;
        this.actingPlayer = d.actingPlayer;
        this.workPlacement = d.placements.workPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on('collectorsUpdatePlayers',
    function(players) {
      this.players = players;
      this.$nextTick(function() {
        if (this.numberOfActions === 0) {
          this.$store.state.socket.emit('collectorsNextPlayer', {roomId: this.$route.params.id});
        }
      })
    }.bind(this));

    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        if (this.chosenAction !== "buy") {
          this.players = d.players;
        }
        console.log("placement",d.placements);
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;

        this.workPlacement = d.placements.workPlacement;
        this.playOrder = d.playOrder;
        this.actingPlayer = d.actingPlayer;
        if (this.numberOfActions === 0) {
          this.$store.state.socket.emit('collectorsNextPlayer', {roomId: this.$route.params.id});
        }
      }.bind(this)
    );

    this.$store.state.socket.on('collectorsActingPlayer',
    function(d) {
      this.players = d.players;
      this.actingPlayer = d.actingPlayer;
    }.bind(this)
  );
  this.$store.state.socket.on('collectorsCardBought',
  function(d) {
    console.log(d.playerId, "bought a card");
    this.players = d.players;
    this.itemsOnSale = d.itemsOnSale;
    this.actingPlayer = d.actingPlayer;
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
    console.log(d.playerId, "Initiated auction", d.upForAuction);
    this.auctionCards = d.auctionCards;
    this.players = d.players;
    this.upForAuction = d.upForAuction;
  }.bind(this)
);
this.$store.state.socket.on(
  "collectorsCurrentBidStarted",
  function (d) {
    console.log(d.playerId, "Initiated auction");
    this.players = d.players;
    this.leadingBid = { bid: d.leadingBid, playerId: d.playerId };
  }.bind(this)
);
this.$store.state.socket.on(
  "collectorsPassStarted",
  function (d) {
    console.log(d.playerId, "Ended auction");
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
    let id = p.id;

    if (action === "work" && id <= 3 || action === "market" && id <= 2) {
      this.numberOfActions = 2;
    }
    else if (action === "work" && id <=6) {
      this.numberOfActions = 0;
    }
    else {
      this.numberOfActions = 1;
    }

    this.chosenAction = action;
    this.$store.state.socket.emit("collectorsPlaceBottle", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
      action: action,
      id: id,
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
  currentBid: function (bid) {
    this.$store.state.socket.emit("collectorsCurrentBid", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
      currentBid: bid,
    });
  },
  passBidding: function () {
    this.$store.state.socket.emit('collectorsPassBidding', {
      roomId: this.$route.params.id,
      playerId: this.playerId,
      card: this.upForAuction,
    }
  );
},
initiateAuction: function (card) {
  this.$store.state.socket.emit('collectorsAuctionCard', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card,
  }
);
},
handleEvent: function (card) {
  if (this.numberOfActions > 0) {
    this.numberOfActions -= 1;

    if (this.chosenAction === "buy") {
      this.buyCard(card);
    }
    else if (this.chosenAction === "skill") {
      this.skillsCard(card);
    }
    else if (this.chosenAction === "auction") {
      this.initiateAuction(card);
    }
    else if (this.chosenAction === "market") {
      this.marketCards(card);
    }
    else if (this.chosenAction === "work") {
      this.cardForIncome(card);
    }
  }
},
isHidden: function (playerId) {
  return this.showPlayerBoard !== playerId;
},
togglePlayerBoard: function (playerId) {
  if (this.showPlayerBoard === playerId) {
    this.showPlayerBoard = "";
  } else this.showPlayerBoard = playerId;
},
cardForIncome: function (card) {
  this.$store.state.socket.emit('collectorsCardForIncome', {
    roomId: this.$route.params.id,
    playerId: this.playerId,
    card: card
  }
);
},
addMoney: function () {
  this.$store.state.socket.emit('collectorsAddMoney', {
    roomId: this.$route.params.id,
    playerId: this.playerId
  });
}
},
};
</script>

<style>
.table {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffff;
}
.board {
  box-sizing: border-box;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: 0.8fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
  "itemPool itemPool skillPool skillPool"
  "workPool auctionPool auctionPool auctionPool"
  "marketPool marketPool marketPool marketPool";
}
.itemPool {
  grid-area: itemPool;
  background-color: #ffb3b3;
  max-height: 70vh;
}
.skillPool {
  grid-area: skillPool;
  background-color: #c2f0c2;
  max-height: 70vh;
}
.workPool {
  grid-area: workPool;
  background-color: #ffe6b3;
  max-height: 70vh;
}
.marketPool {
  grid-area: marketPool;
  background-color: #66a3ff;
  max-height: 70vh;
}
.auctionPool {
  grid-area: auctionPool;
  background-color: #ecd9c6;
  max-height: 70vh;
}
.PlayerBoardCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 6vw);
  grid-template-rows: repeat(auto-fill,   8.4vw);
}
.PlayerBoardCards div {
  transform: scale(0.7) translate(10%, -10%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.PlayerBoardCards div:hover {
  transform: scale(1) translate(0, 0);
  z-index: 1;
}
.playerItem {
  display: none;
  background-color: #b3ecff;
}
.PlayerBoardCardss {
  display: grid;
  grid-template-columns: repeat(auto-fill, 6vw);
  grid-template-rows: repeat(auto-fill, 8.4vw);
}
.PlayerBoardCardss div {
  transform: scale(0.7) translate(10%, -10%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.PlayerBoardCardss div:hover {
  transform: scale(1) translate(0, 0);
  z-index: 1;
}
.playerItem {
  display: none;
  background-color: #b3ecff;
}
.clickable {
  position: fixed;
  right: 0%;
  top: 0%;
  cursor: pointer;
  background: #4d94ff;
  margin-right: 1.5em;
  width: 23vw;
}
/* clickable för motståndare*/
.clickable1 {
  background-color: #4d94ff;
  display: grid;
  grid-template-columns: repeat(auto-fit,23vw);
}
.clickable1 > div {
  position: relative;
}
.test{
  position: absolute;
  right: 23vw;
  top: 0%;
  cursor: pointer;
  background: #4d94ff;
  margin-right: 1.5em;
  width: 70vw;
}
.money {
  height: 100;
  display: flex;
}
.column{
  float: left;
  width: 33.33%;
  padding: 5px;
}
.money::after {
  content: "";
  clear: both;
  display: table;
}
.player {
  background: #e6ccff;
  position: fixed;
  right: 0%;
  top: 3%;
  width: 23vw;
  height: 100vh;
  margin-right: 1em;
  transition: 1s;
  overflow: hidden;
  font-size: 15pt;
}
.player1 {
  background: #b3d1ff;
  position: absolute;
  right: 30%;
  top: 3%;
  width: 23vw;
  height: 100vh;
  margin-right: 1em;
  transition: 1s;
  overflow: hidden;
  font-size: 15pt;
}
.playerTest {
  background: #b3b3ff;
  position: absolute;
  right: 0;
  top: 3%;
  width: 23vw;
  height: 100vh;
  transition: 1s;
  transition-property: height;
  overflow: hidden;
  font-size: 15pt;
}
.playerHand {
  background-color: #e6ccff;
  height: 100%;
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
  grid-template-columns: repeat(1000,6vw);
  height: 8.4vw;
}
.cardslots-wrapper {
  overflow-x: scroll;
}
.cardslots div {
  transform: scale(0.7) translate(10%, -10%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(0, 0);
  z-index: 1;
}
.playerboard {
  background: yellow;
  height: 50vh;
  overflow: hidden;
  transition: 1s;
  width: 50vw;
  font-size: 15pt;
}
.ishidden {
  height: 0;
  width: 0;
  font-size: 0;
}

@media (max-width: 800px) {
  /*För mindre skärmar*/
  .board {
    grid-gap: 0px;
    grid-template-rows: 50vh 50vh 50vh 72vh 50vh;
    grid-template-columns: 100vw;
    grid-template-areas:
    "itemPool "
    "skillPool "
    "workPool "
    "auctionPool "
    "marketPool ";
  }
}

@media screen and (max-width: 600px) {
  /*För mindre skärmar*/
  .board {
    grid-gap: 0px;
    grid-template-rows: 50vh 50vh 50vh 72vh 50vh;
    grid-template-columns: 100vw;
    grid-template-areas:
    "itemPool "
    "skillPool "
    "workPool "
    "auctionPool "
    "marketPool ";
  }
}
</style >
