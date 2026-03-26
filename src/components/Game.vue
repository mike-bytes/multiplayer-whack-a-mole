<template>
  <div class="game" v-if="socketStore.connected">
    <div class="top">
      <div class="title">Multiplayer Whack-a-Mole</div>
      <NameInput v-model="userName" />
      <ScoreBoard />
    </div>
    <WinnerBanner v-if="!!gameStore.winner" />
    <GameBoard />
  </div>
</template>

<script>
import NameInput from '@/components/NameInput.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameBoard from '@/components/GameBoard.vue';
import WinnerBanner from '@/components/WinnerBanner.vue';
import { useGameStore } from '@/stores/gameStore';
import { useSocketStore } from '@/stores/socketStore';

export default {
  name: 'Game',
  components: { ScoreBoard, GameBoard, NameInput, WinnerBanner },
  data() {
    return {
      gameStore: useGameStore(),
      socketStore: useSocketStore(),
      userName: '',
    };
  },
  watch: {
    userName(newValue) {
      this.socketStore.socket.emit('setPlayerName', this.userName);
    },
  },
  mounted() {
    this.socketStore.socket.on('gameState', this.gameStateHandler);
  },
  unmounted() {
    this.socketStore.socket.off('gameState', this.gameStateHandler);
  },
  methods: {
    gameStateHandler(state) {
      this.gameStore.setGameState(state);
    },
  },
};
</script>

<style scoped lang="scss">
.game {
  .top {
    display: flex;
    justify-content: space-around;
    width: 100vw;
    padding: 20px;
    position: absolute;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.5rem;

      @media (max-width: 600px) {
        display: none;
      }
    }
  }
}
</style>
