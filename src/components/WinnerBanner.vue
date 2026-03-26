<template>
  <div class="winner-banner">
    <div class="banner-content">
      <h1>🎉 {{ store.winner.name }} Wins! 🎉</h1>
      <p>Final Scoring: <ScoreBoard /></p>
      <div v-if="store.countdown > 0">{{ store.countdown }}</div>
      <!-- <button @click="playAgain" class="btn-play-again">Play Again</button> -->
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti';
import { useGameStore } from '@/stores/gameStore';
import ScoreBoard from '@/components/ScoreBoard.vue';
import { socket } from '@/services/socket';

export default {
  name: 'WinnerBanner',
  components: { ScoreBoard },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      store: useGameStore(),
      celebrationPlayed: false,
      interval: null,
    };
  },
  watch: {
    'store.winner'(winner) {
      if (!winner || this.celebrationPlayed) return;
      this.celebrationPlayed = true;
      confetti({ particleCount: 500, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 500, angle: 120, spread: 70, origin: { x: 1 } });
    },
  },
  mounted() {
    socket.on('startCountdown', (endTime) => {
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);
        this.store.countdown = Math.max(remaining, 0);

        if (remaining <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    });
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
  },
  methods: {
    playAgain() {
      confetti.reset();
      this.$emit('play-again');
      this.store.winner = null;
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
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #333;
  }

  .btn-play-again {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn-play-again:hover {
    background: #45a049;
  }
}
</style>
