<template>
  <div class="card-container">
    <ion-card color="light" class="max-width-card" v-for="card in cards" :key="card.id">
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      <ion-card-header>
        <ion-card-title>Card Title</ion-card-title>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        Here's a small text description for the card content. Nothing more, nothing less.
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

const cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];
</script>

<style scoped>
.max-width-card {
  max-width: 300px; /* Здесь можно указать желаемую максимальную ширину */
  margin: 10px;
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
