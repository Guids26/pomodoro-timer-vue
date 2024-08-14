<script setup>
import { useSetingsStore } from '@/stores/useSettings';
import { useTimerStore } from '@/stores/useTimer';
import { ref } from 'vue';

const store = useSetingsStore();
const timerStore = useTimerStore();

const minutesWorking = ref(timerStore.workingTimer.time / 60);
const minutesShortBreak = ref(timerStore.shortBreakTimer.time / 60);
const minutesLongBreak = ref(timerStore.longBreakTimer.time / 60);
const cyclesNumber = ref(timerStore.cycles);

const handleSave = () => {
  timerStore.updateParams(minutesWorking.value * 60, minutesShortBreak.value * 60, minutesLongBreak.value * 60, cyclesNumber.value);
  store.updateShowSettings();
}
</script>

<template>
  <div tabindex="0" class="transparentContainer" @keyup.esc="store.updateShowSettings">
    <div class="container">
      <div class="header">
        <div class="header-title">
          <h1>Settings</h1>
        </div>
        <div class="header-btn">
          <button @click="store.updateShowSettings" class="close-btn">X</button>
        </div>
      </div>

      <form @submit.prevent="handleSave">
        <div class="formSettings">
          <label for="minutesWorking">Working time</label>
          <input id="minutesWorking" min="1" max="60" v-model="minutesWorking" type="number">
          <label for="minutesShortBreak">Short break</label>
          <input id="minutesShortBreak" min="1" max="60" v-model="minutesShortBreak" type="number">
          <label for="minutesLongBreak">Long break</label>
          <input id="minutesLongBreak" min="1" max="60" v-model="minutesLongBreak" type="number">
          <label for="cycles">Cycles</label>
          <input id="cycles" min="1" v-model="cyclesNumber" type="number">
          <button class="btn btn-save" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.transparentContainer {
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background-color: white;
  width: 90%;
  height: auto;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 30px;
}

.header {
  display: flex;
  justify-content: flex-start;
}

.header-title {
  display: flex;
  justify-content: center;
  width: 100%;
}

.header-btn {
  display: flex;
  justify-content: end;
  width: 0%;
}

/* Botão de Fechar */
.close-btn {
  margin: 10px;
  background-color: #FF5F5F;
  color: white;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 48px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #e05050;
}

.close-btn:active {
  background-color: #c94545;
}

.formSettings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.btn-save {
  margin-top: 10px;
}

/* label {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
} */

input {
    width: 40%;
    font-size: 16px; 
    border: 2px solid #FF5F5F; /* Borda vermelha suave */
    border-radius: 5px;
    background-color: #F5F5F5; /* Cor de fundo suave */
    color: #333;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
    border-color: #FF5F5F; /* Borda vermelha no foco */
    box-shadow: 0 0 5px rgba(255, 95, 95, 0.5); /* Sombra suave no foco */
    outline: none;
}

input::placeholder {
    color: #999; /* Cor do placeholder */
}

</style>
