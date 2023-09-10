<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="!userStore.state.loggedIn" tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="logIn" />
          <ion-label>Войти</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="userStore.state.loggedIn" @click="logout()">
          <ion-icon aria-hidden="true" :icon="logOut" />
          <ion-label>Выйти</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="userStore.state.loggedIn" tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, square, logIn, logOut } from 'ionicons/icons';
import { store } from '@/stores/userStore';

const userStore = store;

const logout = () => {
  userStore.dispatch('logout');
};

</script>
