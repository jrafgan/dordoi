<template>
  <div>
    <ion-text>
      <h3 class="form-header">Создать товар</h3>
    </ion-text>
    <ion-toast
        :is-open="isOpen"
        message="Что-то не заполнили !"
        :duration="5000"
        @didDismiss="setOpen(false)"
        class="toast"
    ></ion-toast>
    <form @submit="submitForm" class="form-container"  enctype="multipart/form-data">

      <ion-select v-model="selectedCategory" @ionChange="categoryChanged" placeholder="Категория" required>
        <ion-select-option :value="category.name" v-for="category in catalog" :key="category.name">{{ category.name }}
        </ion-select-option>
      </ion-select>

      <!-- Если выбрана категория с подкатегориями, показываем выпадающий список для подкатегорий -->
      <ion-select v-if="selectedSubcategories.length > 0" v-model="selectedSubcategory" placeholder="Подкатегория"
                  required>
        <ion-select-option :value="subcategory.name" v-for="subcategory in selectedSubcategories"
                           :key="subcategory.name">{{ subcategory.name }}
        </ion-select-option>
      </ion-select>

      <ion-input v-model="productTitle" label="Наименование товара" label-placement="floating"
                 fill="clear"
                 placeholder="Наименование товара" type="text" required></ion-input>
      <br/>
      <ion-textarea
          v-model="productDescription"
          label="Опишите свой товар"
          label-placement="floating"
          fill="outline"
          placeholder="Опишите свой товар"
          :auto-grow="true"
          required
      ></ion-textarea>

      <ion-select v-model="selectedBazaar" placeholder="Выберите базар">
        <ion-select-option
            :value="bazaar.name"
            v-for="bazaar in bazaarNames"
            :key="bazaar.name"
        >
          {{ bazaar.name }}
        </ion-select-option>
      </ion-select>

      <ion-input v-model="sellerPhone" label="Ваш тел. номер" type="tel" placeholder="+996111111111"
                 label-placement="floating" fill="clear" required></ion-input>

      <ion-input v-model="containerRow" label="Ряд вашего контейнера" label-placement="floating" fill="clear"
                 placeholder="Ряд или проход или торговый центр" required></ion-input>

      <ion-input v-model="containerNumber" class="input" label="Номер контейнера" label-placement="floating"
                 fill="clear"
                 placeholder="Номер контейнера" type="number" required></ion-input>
      <br/>
      <p>Главное фото</p>
      <input type="file" @change="handleImageUpload('Главное фото')($event)" accept="image/*">
      <p>Фото спереди</p>
      <input type="file" @change="handleImageUpload('Фото спереди')($event)" accept="image/*">
      <p>Фото сзади</p>
      <input type="file" @change="handleImageUpload('Фото сзади')($event)" accept="image/*">
      <p>Фото слева</p>
      <input type="file" @change="handleImageUpload('Фото слева')($event)" accept="image/*">
      <p>Фото справа</p>
      <input type="file" @change="handleImageUpload('Фото справа')($event)" accept="image/*">
      <p>Фото детали 1</p>
      <input type="file" @change="handleImageUpload('Фото деталь 1')($event)" accept="image/*">
      <p>Фото детали 2</p>
      <input type="file" @change="handleImageUpload('Фото деталь 2')($event)" accept="image/*">
      <p>Фото детали 3</p>
      <input type="file" @change="handleImageUpload('Фото деталь 3')($event)" accept="image/*">
      <p>Фото детали 4</p>
      <input type="file" @change="handleImageUpload('Фото деталь 4')($event)" accept="image/*">
      <p>Фото детали 5</p>
      <input type="file" @change="handleImageUpload('Фото деталь 5')($event)" accept="image/*">

      <!-- Вывод выбранных изображений -->
      <div class="image-container">
        <div v-for="(image, index) in selectedImages" :key="index" class="image-item">
          <p>{{ types[index] }}</p>
          <img :src="urls[index]" alt="Изображение" class="image">
        </div>
      </div>

      <br/>
      <br/>
      <ion-button type="submit" expand="full">Создать товар</ion-button>
      <br/>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {catalog, bazaarNames} from '@/DataArr';
import {
  IonContent,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonText,
  IonToast,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { store } from '@/stores/userStore';
import { cardStore } from '@/stores/cardStore';

const userStore = store;

const selectedCategory = ref('');
const selectedSubcategory = ref('');
const selectedSubcategories = ref([]);

const productTitle = ref('');
const productDescription = ref('');
const selectedBazaar = ref('');
const sellerPhone = ref('');
const containerRow = ref('');
const containerNumber = ref('');

const selectedImages = ref([]);
const types = ref([]);
const urls = ref([]); //todo это не надо отправлять на сервер

const isOpen = ref(false);

const categoryChanged = () => {
  // Найдем объект выбранной категории
  const selectedCategoryObject = catalog.find(category => category.name === selectedCategory.value);

  if (selectedCategoryObject) {
    // Если есть подкатегории, сохраняем их
    selectedSubcategories.value = selectedCategoryObject.subcategories || [];
    // Сбрасываем выбранную подкатегорию
    selectedSubcategory.value = '';

  } else {
    // Если нет подкатегорий для выбранной категории, очищаем список подкатегорий
    selectedSubcategories.value = [];
    selectedSubcategory.value = '';
  }
};

// При добавлении изображения, вы должны также добавить тип и URL в соответствующие массивы
const handleImageUpload = (imageType) => (event) => {
  const input = event.target;

  if (input.files && input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const imageUrl = URL.createObjectURL(file);

      selectedImages.value.push(file);
      types.value.push(imageType);
      urls.value.push(imageUrl);
    }
  }
};

const setOpen = (state) => {
  isOpen.value = state;
};

const submitForm = async (event) => {
  event.preventDefault();
  if (!selectedCategory || !selectedSubcategory || !selectedBazaar || selectedImages.value.length === 0) {
    setOpen(true);
    return
  }

  const currentDate = new Date();

  const formData = new FormData();
  formData.append('user', userStore.state.userId);
  formData.append('selectedCategory', selectedCategory.value);
  formData.append('selectedSubcategory', selectedSubcategory.value);
  formData.append('productTitle', productTitle.value);
  formData.append('productDescription', productDescription.value);
  formData.append('selectedBazaar', selectedBazaar.value);
  formData.append('sellerPhone', sellerPhone.value);
  formData.append('containerRow', containerRow.value);
  formData.append('containerNumber', containerNumber.value);

  if (cardStore && cardStore.createdAt) {
    formData.append('updatedAt', currentDate);
  }

// Добавляем файлы
  for (let i = 0; i < selectedImages.value.length; i++) {
    formData.append('images', selectedImages.value[i]);
    formData.append('types', types.value[i]);
    formData.append('urls', urls.value[i]);
  }

  await cardStore.dispatch('createNewCard', formData);
};

</script>

<style scoped>
.form-header {
  display: flex;
  justify-content: center; /* Горизонтальное выравнивание по центру */
  align-items: center; /* Вертикальное выравнивание по центру */
}

.form-container {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

img {
  max-width: 100px;
  max-height: 100px;
  margin: 10px;
}

/* Стили для контейнера изображений */
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Расстояние между изображениями */
}

/* Стили для отдельного изображения */
.image-item {
  flex: 1; /* Равномерное распределение пространства между изображениями */
  min-width: calc(33.33% - 20px); /* Минимальная ширина элемента (на 3 столбца) */
}

/* Стили для изображения */
.image {
  width: 100%; /* Изображение заполняет всю доступную ширину элемента-контейнера */

}

.toast {
  --background: red
}
</style>
