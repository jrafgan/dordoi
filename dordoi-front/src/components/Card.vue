<template>
  <div class="card-container">
    <ion-card color="light" class="max-width-card" v-for="card in cards" :key="card._id"  @click="showMore(card._id)">
      <div class="image_container" >
        <img v-if="card.selectedImages.length > 0" class="margin" alt="Silhouette of mountains" :src="card.selectedImages[0].url"/>
        <img v-else alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"/>
      </div>
        <ion-card-header>
        <ion-card-title>{{ card.productTitle }}</ion-card-title>
        <ion-card-subtitle>Артикул: {{ card.sku }}</ion-card-subtitle>
        <ion-card-subtitle>Цена: {{ card.price }} руб.</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        {{ card.productDescription  }}
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { cardStore } from "../stores/cardStore";
import {computed} from "vue";

const { cards } = defineProps(['cards']);
const allCards = computed(() => cardStore.getters.getAllCards);

const showMore = (id) => {
  const card = allCards.value.find((card) => card._id === id);
  if (card) {
    cardStore.commit('setSelectedCard', card)
  }
}

</script>

<style scoped>
.max-width-card {
  max-width: 300px; /* Здесь можно указать желаемую максимальную ширину */
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Плавное изменение цвета */
}

.max-width-card:hover {
  background-color: #fff; /* Цвет при наведении */
}

.image_container {
  display: flex;
  justify-content: center; /* Горизонтальное центрирование */
  align-items: center;
}

.margin {
  margin-right: auto;
  margin-left: auto;
  width: 270px;
  height: 360px;
}

.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* Применяем стили для мобильных устройств */
@media (max-width: 400px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
