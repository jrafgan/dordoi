<template>
  <div class="card-container">
    <Card/>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
}

/* Применяем стили для мобильных устройств */
@media (max-width: 400px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
