<script setup>
import { ref } from 'vue';
import Settings from './Settings.vue';
import { useSetingsStore } from '@/stores/useSettings';
import { storeToRefs } from 'pinia';

const store = useSetingsStore();

const { showSettings } = storeToRefs(store);

</script>

<template>
    <div class="header">
        <h1>Pomodoro Timer</h1>
        <div class="buttons">
            <img id="settings" v-on:click="store.updateShowSettings()" src="../assets/settings-3110.svg" alt="settings">
        </div>
    </div>
    <Settings v-if="showSettings" />
</template>

<style scoped>
.header {
    align-items: center;
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.buttons {
    align-items: center;
}

#settings {
    cursor: pointer;
    width: 32px;
    height: 32px;
}
</style>
