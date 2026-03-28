<template>
  <div class="game" v-if="socketStore.connected">
    <div class="top">
      <div class="title">Multiplayer Whack-a-Mole</div>
      <ScoreBoard />
    </div>
    <WinnerBanner v-if="!!gameStore.winner" />
    <NewChallengerScreen v-if="detectNewPlayer" @done="detectNewPlayer = false" />
    <GameBoard v-else />
  </div>
</template>

<script>
import NameInput from '@/components/NameInput.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameBoard from '@/components/game/GameBoard.vue';
import WinnerBanner from '@/components/game/WinnerBanner.vue';
import { useGameStore } from '@/stores/gameStore';
import { useSocketStore } from '@/stores/socketStore';
import NewChallengerScreen from '@/components/screens/NewChallengerScreen.vue';

export default {
  name: 'Game',
  components: { ScoreBoard, GameBoard, NameInput, WinnerBanner, NewChallengerScreen },
  data() {
    return {
      gameStore: useGameStore(),
      socketStore: useSocketStore(),
      detectNewPlayer: false,
    };
  },
  mounted() {
    this.socketStore.socket.on('gameState', this.gameStateHandler);
    this.socketStore.socket.on('newPlayer', this.newPlayerHandler);
  },
  unmounted() {
    this.socketStore.socket.off('gameState', this.gameStateHandler);
    this.socketStore.socket.off('newPlayer', this.newPlayerHandler);
  },
  methods: {
    gameStateHandler(state) {
      this.gameStore.setGameState(state);
    },
    newPlayerHandler() {
      console.log('new player detected');
      this.detectNewPlayer = true;
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
    }
  }
}
</style>
