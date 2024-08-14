<script setup>
import { defineProps } from 'vue';

const props = defineProps(['title', 'action'])
</script>

<template>
  <button @click="props.action()" class="btn">{{ props.title }}</button>
</template>

<style scoped>
/* Estilos gerais do botão */
.btn {
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  text-decoration: none;
  color: #FFFFFF;
  /* Cor do texto */
  background-color: #FF4C4C;
  /* Cor de fundo do botão */
  border: none;
  border-radius: 5px;
  padding: 1% 2%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 1px;
}

/* Efeito de hover */
.btn:hover {
  background-color: #D32F2F;
  /* Cor de fundo no hover */
  transform: scale(1.05);
  /* Aumenta um pouco o tamanho */
}

/* Efeito de foco */
.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 76, 76, 0.3);
  /* Sombra de foco */
}

/* Tamanhos pequenos (celulares) */
@media (max-width: 600px) {
  .btn {
    margin-bottom: 8px;
    width: 80%;
    height: 40px;
  }
}

/* Tamanhos médios (tablets) */
@media (min-width: 601px) and (max-width: 900px) {
  .btn {
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 10px;
    margin-left: 20px;
  }
}

/* Tamanhos grandes (desktops) */
@media (min-width: 901px) {
  .btn {
    font-size: 30px;
    font-weight: 500;
    padding-bottom: 10px;
  }
}
</style>