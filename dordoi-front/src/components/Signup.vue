<template>
  <ion-text>
    <h3 class="form-header">Регистрация</h3>
  </ion-text>
  <ion-toast
      :is-open="isOpen"
      message="Пароли не совпадают"
      :duration="5000"
      @didDismiss="setOpen(false)"
  ></ion-toast>
  <form @submit="submitForm">
    <ion-input v-model="email" class="input" label="Ваш email" label-placement="floating" fill="clear"
               placeholder="Ваш email" ref="input"
               type="email" error-text="email не правильный"
               @ionInput="validate"
               @ionBlur="markTouched" required></ion-input>
    <ion-input v-model="name" class="input" label="Ваше имя" label-placement="floating" fill="clear"
               placeholder="Ваше имя" required></ion-input>
    <ion-input v-model="password" class="input" label="Пароль" label-placement="floating" fill="clear"
               placeholder="Пароль" type="password" value="password" required></ion-input>
    <ion-input v-model="confirmPassword" class="input" label="Повторите пароль" label-placement="floating" fill="clear"
               placeholder="Повторите пароль" type="password" value="password" required></ion-input>
    <ion-button type="submit" expand="full" required>Зарегистрироваться</ion-button>
  </form>
</template>

<script setup>
import {ref} from 'vue';
import {IonLabel, IonInput, IonButton, IonText, IonToast} from '@ionic/vue';
import { store } from '@/stores/userStore';

const userStore = store;

// todo создать поле для загрузки фото юзера

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const inputRef = ref(null);
const isOpen = ref(false);

const validateEmail = (email) => {
  return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
};

const validate = () => {
  if (inputRef.value) {
    inputRef.value.$el.classList.remove('ion-valid');
    inputRef.value.$el.classList.remove('ion-invalid');

    const value = email.value;

    if (value === '') return;

    validateEmail(value) ? inputRef.value.$el.classList.add('ion-valid') : inputRef.value.$el.classList.add('ion-invalid');
  }
};

const markTouched = () => {
  if (inputRef.value) {
    inputRef.value.$el.classList.add('ion-touched');
  }
};

const setOpen = (state) => {
  isOpen.value = state;
};

const submitForm = async (e) => {
  e.preventDefault();
  try {
    if (password.value !== confirmPassword.value) {
      setOpen(true)
    }
    const data = {
      username: name.value,
      email: email.value,
      password: password.value
    }
    await userStore.dispatch('register', data);

  } catch (e) {
    console.error(e.message);
  }
};

</script>

<style scoped>
.form-header {
  display: flex;
  justify-content: center; /* Горизонтальное выравнивание по центру */
  align-items: center; /* Вертикальное выравнивание по центру */
  height: 100%;
}
</style>
