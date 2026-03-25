<template>
  <div :class="['mole-hole', { hitAnimation }]" @click="whack">
    <div v-if="isActive" class="mole">🐹</div>

    <div v-if="showMallet" class="mallet" :class="{ swing: showMallet }">🔨</div>
    <div v-if="showScore" class="score-pop">+1</div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import { socket } from '@/services/socket';

export default {
  name: 'MoleHole',
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
      console.log('hole', this.index, 'activeMole', this.store.activeMole);
      return this.store.activeMole === this.index;
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
      this.showPlusOne(index);
    });
  },
  methods: {
    whack() {
      this.showMallet = true;
      setTimeout(() => {
        this.showMallet = false;
      }, 350); // match with animation duration

      if (!this.isActive) return;

      socket.emit('whack', this.index);
    },
    showPlusOne(index) {
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
  box-sizing: border-box; // include padding/border in width
  border-radius: 50%;
  cursor: pointer;
  flex: 0 0 calc(33.333% - 30px);
  background-color: #593b22;

  &.hitAnimation {
    animation: moleHoleAnimation 0.3s ease forwards;
  }

  .mole {
    font-size: 4rem;
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

  .score-pop {
    position: absolute;
    color: gold;
    font-weight: bold;
    font-size: 40px;
    animation: floatUp 0.6s ease forwards;
  }

  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(40px);
    }
    100% {
      opacity: 0;
      transform: translateY(-80px);
    }
  }

  $malletOffsetX: 40px;
  $malletOffsetY: -20px;

  .mallet {
    position: absolute;
    font-size: 80px;
    pointer-events: none;

    transform: translate($malletOffsetX, $malletOffsetY);
    transform-origin: bottom center;

    &.swing {
      animation: malletSwing 0.35s ease;
    }
  }

  @keyframes malletSwing {
    0% {
      transform: translate($malletOffsetX, $malletOffsetY) rotate(0deg);
    }

    50% {
      transform: translate($malletOffsetX, $malletOffsetY) rotate(-45deg) scale(1.1);
    }

    100% {
      transform: translate($malletOffsetX, $malletOffsetY) rotate(0deg);
    }
  }
}
</style>
