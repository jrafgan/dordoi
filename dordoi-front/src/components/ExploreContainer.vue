<template>
  <div class="card-container">
    <CardInfo v-if='card' :card='card'/>
    <Card :cards="cards"/>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import CardInfo from "./CardInfo.vue";
import {computed} from "vue";
import {cardStore} from "../stores/cardStore";

const allCards = computed(() => cardStore.getters.getAllCards);
const searchedCards = computed(() => cardStore.getters.getSearchedCards);
const selectedCard = computed(() => cardStore.getters.getSelectedCard);

const cards = computed(() => {
  if (searchedCards.value.length > 0) {
    return searchedCards.value;
  } else {
    return allCards.value;
  }
});

const card = computed(() => {
  if (selectedCard) {
    return selectedCard.value;
  }
})

</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
}

/* Применяем стили для мобильных устройств */
@media (max-width: 400px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
