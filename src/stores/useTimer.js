import { defineStore } from "pinia";
import Timer from "@/models/Timer";

export const useTimerStore = defineStore("timer", {
  state: () => {
    return {
      workingTimer: new Timer(1500, "Working"),
      shortBreakTimer: new Timer(300, "Short break"),
      longBreakTimer: new Timer(1200, "Long break"),
      cycles: 4,
      cyclesRemaining: 4,
      cyclesDone: 0,
      currentTimer: null,
    };
  },
  actions: {
    updateParams(workingTime, shortBreak, longBreak, cycles) {
      this.workingTimer.setTime(workingTime);
      this.shortBreakTimer.setTime(shortBreak);
      this.longBreakTimer.setTime(longBreak);
      this.cycles = cycles;
      this.cyclesRemaining = cycles;
    },
    resetAll() {
      this.workingTimer.reset();
      this.shortBreakTimer.reset();
      this.longBreakTimer.reset();
      this.workingTimer.stop();
      this.shortBreakTimer.stop();
      this.longBreakTimer.stop();
      this.currentTimer = null;
      this.cyclesRemaining = this.cycles; // Corrigido aqui
    },
    reset() {
      switch (this.currentTimer) {
        case this.workingTimer:
          this.workingTimer.reset();
          break;
        case this.shortBreakTimer:
          this.shortBreakTimer.reset();
          break;
        case this.longBreakTimer:
          this.longBreakTimer.reset();
          break;
        default:
          break;
      }
    },
    start() {
      if (
        this.currentTimer == null ||
        (this.currentTimer == this.workingTimer &&
          this.workingTimer.getRemainingTime() > 0)
      ) {
        this.currentTimer = this.workingTimer;
        this.workingTimer.start().then(() => {
          if (this.workingTimer.getRemainingTime() == 0) {
            this.workingTimer.playSoundAlarm();
            if (this.cyclesRemaining > 1) {
              this.shortBreakTimer.reset();
              this.currentTimer = this.shortBreakTimer;
            } else {
              this.longBreakTimer.reset();
              this.currentTimer = this.longBreakTimer;
            }
          }
        });
      } else if (
        this.currentTimer == this.shortBreakTimer &&
        this.cyclesRemaining > 1
      ) {
        this.shortBreakTimer.start().then(() => {
          if (this.shortBreakTimer.getRemainingTime() == 0) {
            this.shortBreakTimer.playSoundAlarm();
            this.cyclesRemaining--;
            this.workingTimer.reset();
            this.currentTimer = this.workingTimer;
          }
        });
      } else if (this.currentTimer == this.longBreakTimer) {
        this.longBreakTimer.start().then(() => {
          if (this.longBreakTimer.getRemainingTime() == 0) {
            this.longBreakTimer.playSoundAlarm();
            this.workingTimer.reset();
            this.shortBreakTimer.reset();
            this.longBreakTimer.reset();
            this.currentTimer = null;
            this.cyclesRemaining = this.cycles; // Corrigido aqui
            this.cyclesDone++;
          }
        });
      }
    },
    stop() {
      console.log(this.currentTimer);
      if (
        this.currentTimer != null &&
        this.currentTimer.getRemainingTime() > 0 &&
        this.currentTimer.getIsRunning()
      ) {
        this.workingTimer.stop();
        this.shortBreakTimer.stop();
        this.longBreakTimer.stop();
      }
    },
  },
});
