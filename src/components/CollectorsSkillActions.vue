<template>
  <div>
  <!--  <div class="skillPool">
      Skill
      <div class="bottlePlacement">
        <div class="energiflaska"></div>
        <div class="energiflaska"></div>
        <div class="energiflaska"></div>
        <div class="energiflaska"></div>
        <div class="energiflaska"></div>
      </div>
      <div class="skillCards">
        <CollectorsCard
        v-for="(card, index) in skillsOnSale"
        :card="card"
        :key="index"
        />
      </div>
    </div>
-->

    <h1>{{ labels.buyCard }}</h1>
    <div class="buy-cards">
      <div v-for="(card, index) in skillsOnSale" :key="index">
        <CollectorsCard
        :card="card"
        :availableAction="card.available"
        @doAction="buyCard(card)"/>
        {{ cardCost(card) }}
      </div>
    </div>
    <div>
      <div class="buttons2" v-for="(p, index) in placement" :key="index"> <!-- döpt om denna till  button2 -->
        <button
        v-if="p.playerId===null"
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
  name: 'CollectorsSkillActions',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    placement: Array
  },
  methods: {
    placeBottle: function (p) {
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        if (this.skillsOnSale[i].item <= this.player.money - cost) {
          this.$set(this.skillsOnSale[i], "available", true);
        }
        else {
          this.$set(this.skillsOnSale[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (this.player.hand[i].item <= this.player.money - cost) {
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
.buy-cards, .buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
}

.skillPool {
  grid-column: 1;
  grid-row: 1 / span 5;
  background-color: #3399ff;
  display: flex;
  /* grid-gap: 0.5rem; */
  /* column-gap: 0.5rem;*/
  /* row-gap: 0.5rem;*/
  /*grid-template-columns: repeat(auto-fill, 50px);*/
}
 /*
.energiflaska {
  background-image: url("/images/flaska.png");
  height: 10vh;
  width: 10vw;
  background-size: cover;
}
.bottlePlacement {
  float: left;
  display: inline;
  width: 49%;
}
.skillCards {
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

</style>
