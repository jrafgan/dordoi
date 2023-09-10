<template>
  <div>
  <ion-buttons slot="start">
    <ion-button @click="showAddItem" fill="outline">Добавить товар</ion-button>
  </ion-buttons>
    <AddItem v-if="showForm"/>
  </div>
</template>

<script setup>
import { IonButtons, IonButton } from '@ionic/vue';
import { store } from '@/stores/userStore';
import { ref } from 'vue';
import AddItem from "./AddItem.vue";

const userStore = store;
const showForm = ref(false);

const showAddItem = () => {
  showForm.value = !showForm.value;
};
</script>

<style scoped>

</style>