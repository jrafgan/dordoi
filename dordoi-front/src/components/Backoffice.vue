<template>
  <div>
    <ion-buttons slot="start">
      <ion-button @click="showAddItem" fill="outline">Добавить товар</ion-button>
    </ion-buttons>
    <AddItem v-if='showForm'/>
    <CardInfo v-if='card' :card='card'/>
    <Card v-if="showCards" :cards="cards"/>
  </div>
</template>

<script setup>
import {IonButtons, IonButton} from '@ionic/vue';
import {store} from '@/stores/userStore';
import {computed, onBeforeMount, ref} from 'vue';
import AddItem from './AddItem.vue';
import Card from './Card.vue';
import { cardStore } from "../stores/cardStore";
import CardInfo from "./CardInfo.vue";

const userStore = store;
const showForm = ref(false);
const showCards = ref(true);

const userCards = computed(() => cardStore.getters.getUserCards);
const selectedCard = computed(() => cardStore.getters.getSelectedCard);
const userId = computed(() => userStore.getters.getUserId);

console.log('userId : ', userId.value);

const cards = computed(() => {
  if (userCards.value.length > 0) {
    return userCards.value;
  }
})

const card = computed(() => {
  if (selectedCard) {
    return selectedCard.value;
  }
})

const showAddItem = () => {
  showForm.value = !showForm.value;
  showCards.value = !showCards.value;
};

onBeforeMount(async () => {
  try {
    if (userCards.value.length === 0) {
      await cardStore.dispatch('findUserCards', userId.value);
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
});

</script>

<style scoped>

</style>