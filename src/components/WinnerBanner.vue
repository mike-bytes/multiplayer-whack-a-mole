<template>
  <div class="winner-banner">
    <div class="banner-content">
      <h1>🎉 {{ gameStore.winner.name }} Wins! 🎉</h1>
      <p>Final Scoring: <ScoreBoard /></p>
      <Button v-if="showButton" @click="playAgainHandler">Play Again</Button>
      <span class="waiting" v-else-if="gameStore.countdown === 0">
        Waiting for opponent<AnimatedDots />
      </span>
      <div v-if="gameStore.countdown > 0">Starting in {{ gameStore.countdown }}</div>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti';
import { useGameStore } from '@/stores/gameStore';
import ScoreBoard from '@/components/ScoreBoard.vue';
import { useSocketStore } from '@/stores/socketStore';
import Button from '@/components/Button.vue';
import AnimatedDots from './AnimatedDots.vue';

export default {
  name: 'WinnerBanner',
  components: { ScoreBoard, Button, AnimatedDots },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gameStore: useGameStore(),
      socketStore: useSocketStore(),
      celebrationPlayed: false,
      interval: null,
      showButton: true,
    };
  },
  watch: {
    'gameStore.winner'(winner) {
      if (!winner || this.celebrationPlayed) return;
      this.celebrationPlayed = true;
      confetti({ particleCount: 500, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 500, angle: 120, spread: 70, origin: { x: 1 } });
    },
  },
  mounted() {
    // wrap in arrow function so the store action is called with correct context
    // (e.g. knows what this.countdown refers to)
    this.socketStore.socket.on('startCountdown', (endTime) =>
      this.gameStore.startCountdown(endTime),
    );
  },
  unmounted() {
    this.socketStore.socket.off('startCountdown');
    if (this.interval) clearInterval(this.interval);
    confetti.reset();
  },
  methods: {
    playAgainHandler() {
      this.showButton = false;
      this.socketStore.socket.emit('playerReady');
    },
  },
};
</script>

<style scoped lang="scss">
.winner-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .banner-content {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .waiting {
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }

  h1 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #333;
  }

  button {
    background-color: gold;
    &:hover {
      background-color: rgb(255, 243, 176);
    }
  }
}
</style>
