<script setup>
import ActionButton from './ActionButton.vue';
import { computed, defineProps } from 'vue';
import { useTimerStore } from '@/stores/useTimer';

const props = defineProps(['timer', 'start']);
const timerStore = useTimerStore();

const remainingTime = computed(() => {
  const minutes = Math.trunc(props.timer.getRemainingTime() / 60);
  const seconds = props.timer.getRemainingTime() % 60;
  return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
})

</script>

<template>
  <div class="globalContainer active">
    <h2>{{ props.timer.getTitle() }}</h2>
    <div class="timeDisplay">
      <h1>{{ remainingTime }}</h1>
    </div>
    <div class="buttonsContainer">
      <ActionButton v-if="props.timer.isRunning == false" :action="timerStore.start" title="Start" />
      <ActionButton v-else :action="timerStore.stop" title="Stop" />
      <ActionButton :action="timerStore.reset" title="Reset" />
      <ActionButton :action="timerStore.resetAll" title="Reset All" />
    </div>
  </div>
</template>

<style lang="css" scoped>
/* Estilos gerais para o timer */
.globalContainer {
  background-color: #FFFFFF;
  /* Fundo branco para o timer */
  border: 5px solid #FF4C4C;
  /* Cor de borda principal */
  border-radius: 15px;
  /* Bordas arredondadas para um visual moderno */
  padding: 20px;
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra leve para profundidade */
  position: relative;
  height: auto;
}

/* Efeito de animação de borda no foco ou tempo de foco */
.globalContainer.active {
  border: 5px solid #D32F2F;
  /* Cor da borda quando o timer está ativo */
  animation: pulse 1.5s infinite;
  /* Animação pulsante */
}

/* Animação pulsante */
@keyframes pulse {
  0% {
    border-color: #FF4C4C;
  }

  50% {
    border-color: #D32F2F;
  }

  100% {
    border-color: #FF4C4C;
  }
}

/* Tamanhos pequenos (celulares) */
@media (max-width: 600px) {
  .buttonsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }
}

/* Tamanhos medios (tablets) */
@media (min-width: 601px) and (max-width: 900px) {
  .buttonsContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
  }
}

/* Tamanhos grandes (desktops) */
@media (min-width: 901px) {
  .buttonsContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
  }
}
</style>
