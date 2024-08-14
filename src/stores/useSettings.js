import { defineStore } from "pinia";

export const useSetingsStore = defineStore("settings", {
  state: () => ({
    showSettings: false,
  }),
  actions: {
    updateShowSettings() {
      this.showSettings = !this.showSettings;
    },
  },
});
