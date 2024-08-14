import clockAlarm from "@/assets/audios/clock-alarm-8761.mp3";

export default class Timer {
  constructor(initialTime, title) {
    this.title = title;
    this.time = initialTime; // Tempo inicial
    this.remainingTime = initialTime; // Tempo restante
    this.isRunning = false; // Estado do timer
  }

  setTime(newTime) {
    this.time = newTime;
    this.remainingTime = newTime;
  }

  setRemainingTime(remainingTime) {
    this.remainingTime = remainingTime;
  }

  getTime() {
    return this.time;
  }

  getRemainingTime() {
    return this.remainingTime;
  }

  getTitle() {
    return this.title;
  }

  getIsRunning() {
    return this.isRunning;
  }

  toggleRunning() {
    this.isRunning = !this.isRunning;
  }

  stop() {
    this.isRunning = false;
  }

  reset() {
    this.remainingTime = this.time; // Use 'this.time' para resetar
    //this.isRunning = false;
  }

  playSoundAlarm() {
    if (clockAlarm) {
      let audio = new Audio(clockAlarm);
      audio.play();
    }
  }

  start() {
    this.isRunning = true;
    console.log("startando " + this.remainingTime); // Use console.log para depuração

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isRunning && this.remainingTime > 0) {
          this.remainingTime -= 1;
          console.log("Tempo restante: " + this.remainingTime);
        } else {
          this.isRunning = false;
          clearInterval(interval);
          console.log("Timer parou");
          resolve(); // Resolve a Promise quando o timer parar
        }
      }, 1000);
    });
  }
}
