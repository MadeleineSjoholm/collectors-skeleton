<template>

  <div class="skillPool">
    <div class="label">
      <h3>{{ labels.skillLabel }}</h3>
    </div>
    <div class="bottlePlacement">
      <div class="buttons" v-for="(p, index) in placement" :key="index">

        <button

        v-if="p.playerId === null"
        :class="[
        { greenEnergy: p.id == 3 },
        { dollarEnergy: p.id == 4 },
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

  <div class="skillCards">
    <CollectorsCard
    v-for="(card, index) in skillsOnSale"
    :card="card"
    :availableAction="card.available"
    :key="index"
    @doAction="skillsCard(card)"
    />
  </div>
</div>

</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
export default {
  name: "CollectorsSkillActions",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
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
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
        this.$set(this.skillsOnSale[i], "available", true);
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        this.$set(this.player.hand[i], "available", true);
      }

    },
    skillsCard: function (card) {
      if (card.available) {
        this.$emit("skillsCard", card);
        this.highlightAvailableCards();
      }
    },
  },

};
</script>

<style scoped>

.skillPool {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 5vh 20vh 15vh;
  grid-template-columns: 1fr;
  grid-template-areas:  "label"
  "skillCards"
  "bottlePlacement";
}

.label {
  grid-area: label;
  font-size: 1.5vw;
  margin-left: 1vw;
}

.greenEnergy {
  background-image: url("/images/greenflaska.png");
  height: 7vw;
  width: 6.6vw;
  background-size: cover;
  border-radius: 15%;

}
.dollarEnergy {
  background-image: url("/images/dollarr.png");
  height: 7vw;
  width: 6.5vw;
  background-size: cover;
  border-radius: 15%;
}
.bottlePlacement {
  grid-area: bottlePlacement;
  grid-gap: 1vw;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;


}
.skillCards {
  grid-area: skillCards;
  display: grid;
  grid-gap:1vw;
  transform: scale(0.7)translate(0%, 0%);
  grid-template-columns: repeat(auto-fill, 8vw);
  grid-template-rows: repeat(auto-fill, 11.2vw);
}

.skillCards div {
  transform: scale(1);
  transition: 0.2s;
  transition-timing-function: ease-out;
}

.skillCards div:hover {
  transform: scale(1.2) translate(0%, 0);
}


@media (max-width: 800px) {
  /*För mindre skärmar, anpassat för Skill*/

  .skillPool {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 10vh 20vh 10vh;
    grid-template-columns: 100vw;
    grid-template-areas:  "label"
    "skillCards"
    "bottlePlacement";
  }

  .skillCards {
    grid-area: skillCards;
    display: grid;
    grid-gap: 2vw;
    transform: scale(0.7)translate(10%, 0%);
    grid-template-columns: repeat(auto-fill, 15vw);
    grid-template-rows: repeat(auto-fill, 21vw);
  }
  .bottlePlacement {
    grid-area: bottlePlacement;
    grid-gap: 2vw;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

  }

}

</style>
