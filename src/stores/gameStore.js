import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    activeItems: [],
    players: {},
    winner: null,
    countdown: 0, // seconds
  }),
  actions: {
    setGameState(state) {
      this.activeItems = state.activeItems;
      this.players = state.players;
      this.winner = state.winner;
    },
  },
});
