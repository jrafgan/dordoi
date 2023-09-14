<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="outline" @click="toggleCategories">Категории</ion-button>
          <ion-button v-if="userStore.state.loggedIn" fill="outline" tab="tab2" href="/tabs/tab2">Личный кабинет</ion-button>
        </ion-buttons>
        <p v-if="userStore.state.loggedIn">Привет, {{ userStore.state.username }}</p>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="showCategories">
        <ion-list-header>
          <ion-label>Категории</ion-label>
        </ion-list-header>
        <!-- Подкатегории: Мужская одежда, Женская одежда, Детская одежда, Спортивная одежда и т.д. -->
        <ion-item v-for="(category, index) in clothingCategories" :key="index">
          <ion-button fill="clear" @click="toggleSubCategories(category)">{{ category.name }}</ion-button>
          <ion-list v-if="showSubCategories[category.name]">
            <ion-item v-for="(subCategory, subIndex) in category.subcategories" :key="subIndex">
              <ion-button fill="clear">{{ subCategory.name }}</ion-button>
            </ion-item>
          </ion-list>
        </ion-item>
      </ion-list>
      <ion-searchbar color="medium" v-model="searchText" @ionInput="handleSearchInput" :debounce="3000"></ion-searchbar>
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonItem, IonList, IonListHeader, IonLabel } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { ref } from 'vue';
const showCategories = ref(false);
const showSubCategories = ref({});
import { store } from '@/stores/userStore';
import { catalog }from '@/DataArr';
import cardStore from "../stores/cardStore";

const userStore = store;
const searchText = ref('');

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};
console.log('user : ', userStore.state.username);

const toggleSubCategories = (category) => {
  showSubCategories.value[category.name] = !showSubCategories.value[category.name];
};

const clothingCategories = ref(catalog);

async function handleSearchInput() {
  if (searchText) {
    await cardStore.dispatch('findByKeyword', searchText.value);
  }
}
</script>
