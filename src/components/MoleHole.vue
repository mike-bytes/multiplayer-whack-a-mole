<template>
  <div :class="['mole-hole', { hitAnimation }]" @mousedown="whack">
    <Item v-if="item" :type="item.type" />
    <Mallet :swing="showMallet" />
    <ScoreIncrement v-show="showScore" :points="points" />
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import { socket } from '@/services/socket';
import Item from '@/components/Item.vue';
import Mallet from '@/components/Mallet.vue';
import ScoreIncrement from '@/components/ScoreIncrement.vue';

export default {
  name: 'MoleHole',
  components: {
    Item,
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
      points: 0,
    };
  },
  computed: {
    item() {
      return this.store.activeItems.find((item) => item.index === this.index);
    },
  },
  mounted() {
    socket.on('hitConfirmed', ({ index, points }) => {
      if (index !== this.index) return;

      this.hitAnimation = true;
      setTimeout(() => {
        this.hitAnimation = false;
      }, 300); // match animation duration
      this.showScoreIncrement(index, points);
    });
  },
  unmounted() {
    socket.off('hitConfirmed');
  },
  methods: {
    whack() {
      if (this.store.winner) return;

      this.showMallet = true;
      setTimeout(() => {
        this.showMallet = false;
      }, 200); // match with animation duration

      if (!this.item) return;

      socket.emit('whack', this.index);
    },
    showScoreIncrement(index, points) {
      this.points = points;
      this.showScore = true;
      setTimeout(() => {
        this.showScore = false;
      }, 2000);
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
}
</style>
