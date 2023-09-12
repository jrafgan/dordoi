<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { store } from '@/stores/userStore';
import { cardStore } from '@/stores/cardStore';

const userStore = store;
const isFirstRun = ref(true);
// Ваша функция, которая должна выполниться один раз
const initializeApp = async () => {
  // Ваш код инициализации приложения
  const isFirstRun = ref(true);
  // После выполнения функции помечаем, что она была вызвана
  isFirstRun.value = false;
  await userStore.dispatch('initializeUser')
};

// Хук onMounted вызывается после монтирования компонента
// onMounted(() => {
//   // Проверяем, была ли функция уже вызвана
//   if (isFirstRun.value) {
//     // Если нет, вызываем функцию
//     initializeApp();
//   }
// });

// Вызываем запрос внутри onBeforeMount
onBeforeMount(async () => {
  try {
    // Выполняем запрос или загрузку данных здесь
    if (isFirstRun.value) {
      // Если нет, вызываем функцию
      await initializeApp();
    }
    await cardStore.dispatch('getNewCards');

  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
    // Обработка ошибки
  }
});

</script>
