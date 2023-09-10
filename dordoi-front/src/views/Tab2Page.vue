<template>
  <ion-page>
    <ion-content>
    <div  v-if="!userStore.state.loggedIn">
      <Authorize />
    </div>
    <div v-else-if="userStore.state.loggedIn">
      <Backoffice />
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonContent} from '@ionic/vue';
import { store } from '@/stores/userStore';
import Authorize from '@/components/Authorize.vue';
import Backoffice from "@/components/Backoffice.vue";

const userStore = store;
console.log('state : ', userStore.state)
</script>
