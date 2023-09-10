<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { store } from '@/stores/userStore'

const userStore = store;
const isFirstRun = ref(true);
// Ваша функция, которая должна выполниться один раз
const initializeApp = () => {
  // Ваш код инициализации приложения
  const isFirstRun = ref(true);
  // После выполнения функции помечаем, что она была вызвана
  isFirstRun.value = false;
  userStore.dispatch('initializeUser')
};

// Хук onMounted вызывается после монтирования компонента
onMounted(() => {
  // Проверяем, была ли функция уже вызвана
  if (isFirstRun.value) {
    // Если нет, вызываем функцию
    initializeApp();
  }
});

</script>
