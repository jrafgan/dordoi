<template>
  <div>
    <ion-card class="custom-card" color='light'>
      <div class='button-container'>
          <ion-button @click="editCard" fill="outline" size="small" class="close-button" color="medium">
            Изменить
          </ion-button>
          <ion-button @click="removeCard(card._id)" fill="outline" size="small" class="close-button" color="medium">
            Удалить
          </ion-button>
      <ion-button @click="clear" fill="outline" size="small" class="close-button" color="medium">
        Закрыть
      </ion-button>
      </div>
      <div class="image-container">
        <div v-for="(image, index) in card.selectedImages" :key="index" class="image-type-container">
          <img :src="image.url" :alt="card.productTitle" class="image" />
          <p class="image-type">{{ card.types[index] }}</p>
        </div>
      </div>
      <ion-card-header>
        <ion-card-title>{{ card.productTitle }}</ion-card-title>
        <ion-card-subtitle><b><i>Артикул :</i></b> {{ card.sku }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Цена :</i></b> {{ card.price }} руб.</ion-card-subtitle>
        <ion-card-subtitle><b><i>Номер контейнера :</i></b> {{ card.containerNumber }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Ряд контейнера :</i></b> {{ card.containerRow }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Базар :</i></b> {{ card.selectedBazaar }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Категория :</i></b> {{ card.selectedCategory }} / {{ card.selectedSubcategory }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Телефон :</i></b> {{ card.sellerPhone }}</ion-card-subtitle>
        <ion-card-subtitle><b><i>Карточка создана :</i></b> {{ formatDate(card.createdAt) }}</ion-card-subtitle>
        <ion-card-subtitle>{{ card.updatedAt ? `Карточка обновлена : ${card.updatedAt}` : '' }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        {{ card.productDescription }}
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonCardContent } from '@ionic/vue';
import {defineProps} from 'vue';
import {cardStore} from "../stores/cardStore";

const { card } = defineProps(['card']); // Получаем объект карточки из props

console.log(' selected card : ', card);

const clear = () => {
  cardStore.commit('setSelectedCard', null);
};

const removeCard = async (id) => {
  await cardStore.dispatch('deleteCard', id);
  clear();
};

const editCard = () => {
  console.log('editing page opened...')
  //cardStore.commit('setSelectedCard', null);
};

// Функция для форматирования даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
</script>
<style scoped>
/* Стили для custom-card */
.custom-card {
  padding: 10px;
}

/* Стили для кнопки закрыть */
.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  flex-wrap: wrap;
}

/* Стили для контейнера изображений */
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Горизонтальное и вертикальное расстояние между изображениями */
  justify-content: space-around; /* Равномерное распределение между изображениями по горизонтали */
  align-items: center; /* Выравнивание по центру по вертикали */
}

/* Стили для контейнера изображения и его типа */
.image-type-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Выравнивание по центру по вертикали */
  text-align: center;
}

/* Стили для изображения */
.image {
  width: 210px; /* Заполнение всей ширины контейнера */
  height: 280px;
  border-radius: 5px;
  border: 1px solid #000;
}

/* Стили для типа изображения */
.image-type {
  margin-top: 5px; /* Расстояние сверху от типа изображения */
}

.bold-italic {
  font-weight: bold;
  font-style: italic;
}
</style>