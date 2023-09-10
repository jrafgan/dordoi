<template>
  <ion-header>
    <ion-toolbar>
      <ion-button fill="clear" @click="toggleComponent('login')" :class="{ 'active-button': showLogin }">Вход
      </ion-button>
      <ion-button fill="clear" @click="toggleComponent('signup')" :class="{ 'active-button': showSignup }">
        Регистрация
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <div class="container">
    <Signup v-if="showSignup"/>
    <Login v-else-if="showLogin"/>
  </div>
</template>

<script setup>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/vue';
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import {ref} from 'vue';
import { store } from '@/stores/userStore';

const userStore =  store;

const showSignup = ref(false);
const showLogin = ref(true);

const toggleComponent = (component) => {
  if (component === 'signup') {
    showSignup.value = true;
    showLogin.value = false;
  } else if (component === 'login') {
    showSignup.value = false;
    showLogin.value = true;
  }
};

</script>

<style scoped>
.container {
  max-width: max-content;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  padding: 10px;
}

.active-button {
  font-weight: bold;
  color: #3880FF;
}
</style>