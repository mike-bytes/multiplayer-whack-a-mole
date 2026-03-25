<template>
  <div class="game">
    <div class="top">
      <div class="title">Multiplayer Whack-a-Mole</div>
      <NameInput v-model="userName" />
      <ScoreBoard />
    </div>
    <WinnerBanner v-if="!!store.winner" />
    <GameBoard />
  </div>
</template>

<script>
import NameInput from '@/components/NameInput.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameBoard from '@/components/GameBoard.vue';
import WinnerBanner from '@/components/WinnerBanner.vue';
import { socket } from '@/services/socket';
import { useGameStore } from '@/stores/gameStore';

export default {
  name: 'Game',
  components: { ScoreBoard, GameBoard, NameInput, WinnerBanner },
  data() {
    return {
      store: useGameStore(),
      userName: '',
    };
  },
  watch: {
    userName(newValue) {
      socket.emit('setPlayerName', this.userName);
    },
  },
  mounted() {
    socket.on('gameState', (state) => {
      this.store.setGameState(state);
    });
  },
  unmounted() {
    socket.off('gameState');
  },
};
</script>

<style scoped lang="scss">
.game {
  font-family: Arial, Helvetica, sans-serif;

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
