import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    activeMoles: [],
    players: {},
    winner: null,
    countdown: 0, // seconds
  }),
  actions: {
    setGameState(state) {
      this.activeMoles = state.activeMoles;
      this.players = state.players;
      this.winner = state.winner;
    },
  },
});
