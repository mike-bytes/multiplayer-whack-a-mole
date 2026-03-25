import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    activeMoles: [],
    players: {},
  }),
  actions: {
    setGameState(state) {
      this.activeMoles = state.activeMoles;
      this.players = state.players;
    },
  },
});
