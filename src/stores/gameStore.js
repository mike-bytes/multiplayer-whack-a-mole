import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    activeMole: null,
    players: {},
  }),
  actions: {
    setGameState(state) {
      this.activeMole = state.activeMole;
      this.players = state.players;
    },
  },
});
