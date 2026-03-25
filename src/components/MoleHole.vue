<template>
  <div :class="['mole-hole', { hitAnimation }]" @click="whack">
    <Mole v-show="isActive" class="mole" />
    <Mallet :swing="showMallet" />
    <ScoreIncrement v-show="showScore" value="1" />
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import { socket } from '@/services/socket';
import Mole from '@/components/Mole.vue';
import Mallet from '@/components/Mallet.vue';
import ScoreIncrement from '@/components/ScoreIncrement.vue';

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
      store: useGameStore(),
      showScore: false,
      showMallet: false,
      hitAnimation: false,
    };
  },
  computed: {
    isActive() {
      return this.store.activeMoles.includes(this.index);
    },
  },
  mounted() {
    socket.on('hitConfirmed', (index) => {
      if (index !== this.index) return;

      console.log('hit confirmed');
      this.hitAnimation = true;
      setTimeout(() => {
        this.hitAnimation = false;
      }, 300); // match animation duration
      this.showScoreIncrement(index);
    });
  },
  methods: {
    whack() {
      if (this.store.winner) return;

      this.showMallet = true;
      setTimeout(() => {
        this.showMallet = false;
      }, 350); // match with animation duration

      if (!this.isActive) return;

      socket.emit('whack', this.index);
    },
    showScoreIncrement(index) {
      this.showScore = true;
      setTimeout(() => {
        this.showScore = false;
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
.mole-hole {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid #c79e7c;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  cursor: pointer;
  flex: 0 0 calc(25% - 20px);
  background-color: #593b22;

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
}
</style>
