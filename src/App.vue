<script setup>
import './assets/style.css'
import Header from "@/components/Header.vue"
import Timer from './components/Timer.vue';
import { useTimerStore } from '@/stores/useTimer';
import { storeToRefs } from 'pinia';

const timerStore = useTimerStore();

const { currentTimer, workingTimer, shortBreakTimer, longBreakTimer, cyclesDone } = storeToRefs(timerStore);

</script>

<template>

  <header>
    <Header></Header>
  </header>

  <body>
    <p class="cyclesDone">Cycles done: {{ cyclesDone }}</p>
    <Timer v-if="currentTimer == null || currentTimer == workingTimer"
      :timer="workingTimer" :start="timerStore.start"></Timer>
    <Timer v-if="currentTimer == shortBreakTimer" :timer="shortBreakTimer">
    </Timer>
    <Timer v-if="currentTimer == longBreakTimer" :timer="longBreakTimer">
    </Timer>
  </body>

</template>

<style scoped>
.cyclesDone{
  text-align: center;
}
</style>
