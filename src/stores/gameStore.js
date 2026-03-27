import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    activeMoles: [],
    players: {},
    winner: null,
    countdown: 0, // seconds
    countdownInterval: null,
  }),
  actions: {
    setGameState(state) {
      this.activeMoles = state.activeMoles;
      this.players = state.players;
      this.winner = state.winner;
    },
    startCountdown(endTime) {
      // this is a promise so that caller can await on it if desired
      return new Promise((resolve) => {
        if (this.countdownInterval) clearInterval(this.countdownInterval);
        this.countdownInterval = setInterval(() => {
          const remaining = Math.ceil((endTime - Date.now()) / 1000);
          this.countdown = Math.max(remaining, 0);

          if (remaining <= 0) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
            this.countdown = 0;
            resolve();
          }
        }, 250);
      });
    },
    stopCountdown() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    },
  },
});
