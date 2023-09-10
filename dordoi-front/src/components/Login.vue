<template>
  <ion-text>
    <h3 class="form-header">Вход</h3>
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
    <ion-input v-model="password" class="input" label="Пароль" label-placement="floating" fill="clear"
               placeholder="Пароль" type="password" value="password" required></ion-input>
    <ion-button type="submit" expand="full">Войти</ion-button>
  </form>

</template>

<script setup>
import {ref} from 'vue';
import {IonLabel, IonInput, IonButton, IonText, IonToast} from '@ionic/vue';
import { store } from '@/stores/userStore'; // Подставьте правильный путь к файлу с хранилищем

const email = ref('');
const password = ref('');
const inputRef = ref(null);
const isOpen = ref(false);

const userStore = store; //todo надо создать проверку полей email

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
    if (!email.value || !password.value) {
      // Обработка ошибки: пароли не совпадают
      setOpen(true)
    }
    const data = {
      email: email.value,
      password: password.value
    }
    await userStore.dispatch('login', data);
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
}
</style>
