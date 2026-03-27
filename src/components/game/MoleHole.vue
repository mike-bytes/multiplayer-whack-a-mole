<template>
  <div :class="['mole-hole', { hitAnimation }]" @pointerdown="whack">
    <Mole v-if="mole" :type="mole.type" />
    <Mallet :swing="showMallet" />
    <div v-if="explosionAnimation" class="explosion">💥</div>
    <ScoreIncrement v-show="showScore" :points="points" />
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import Mole from '@/components/game/Mole.vue';
import Mallet from '@/components/game/Mallet.vue';
import ScoreIncrement from '@/components/ScoreIncrement.vue';
import { useSocketStore } from '@/stores/socketStore';

export default {
  name: 'MoleHole',
  components: {
    Mole,
    Mallet,
    ScoreIncrement,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      gameStore: useGameStore(),
      socketStore: useSocketStore(),
      showScore: false,
      showMallet: false,
      hitAnimation: false,
      explosionAnimation: false,
      points: 0,
    };
  },
  computed: {
    mole() {
      return this.gameStore.activeMoles.find((mole) => mole.index === this.index);
    },
  },
  mounted() {
    this.socketStore.socket.on('hitConfirmed', this.hitHandler);
  },
  unmounted() {
    this.socketStore.socket.off('hitConfirmed', this.hitHandler);
  },
  methods: {
    whack() {
      if (this.gameStore.winner) return;

      this.showMallet = true;
      setTimeout(() => (this.showMallet = false), 200);

      if (!this.mole) return;

      this.socketStore.socket.emit('whack', this.index);
    },
    showScoreIncrement(index, points) {
      this.points = points;
      this.showScore = true;
      setTimeout(() => (this.showScore = false), 2000);
    },
    hitHandler({ index, points, isExplosion }) {
      if (index !== this.index) return;

      this.hitAnimation = true;
      setTimeout(() => (this.hitAnimation = false), 300);

      if (isExplosion) {
        this.explosionAnimation = true;
        setTimeout(() => (this.explosionAnimation = false), 300);
      }
      this.showScoreIncrement(index, points);
    },
  },
};
</script>

<style scoped lang="scss">
.mole-hole {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  cursor: pointer;
  flex: 0 0 calc(25% - 20px);
  background-color: #593b22;

  &:hover {
    background-color: #a86a38;
  }

  &.hitAnimation {
    animation: moleHoleAnimation 0.3s ease forwards;
  }

  @keyframes moleHoleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.7); /* shrink a bit */
    }
    100% {
      transform: scale(1);
    }
  }

  &.gameOver {
    cursor: default;
    opacity: 0.6;
  }

  .explosion {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* center exactly */
    font-size: 9rem;
    pointer-events: none;
    animation: explodeAnim 0.5s ease forwards;
  }

  @keyframes explodeAnim {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
}
</style>
