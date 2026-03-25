<template>
  <div :class="['score-increment', { 'is-negative-points': isNegativePoints }]">
    {{ formattedPoints }}
  </div>
</template>

<script>
export default {
  name: 'ScoreIncrement',
  props: {
    points: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isNegativePoints() {
      console.log('is negative', this.points < 0);
      return this.points < 0;
    },
    formattedPoints() {
      if (this.points > 0) return `+${this.points}`;
      return `${this.points}`;
    },
  },
};
</script>

<style scoped lang="scss">
.score-increment {
  position: absolute;
  color: gold;
  font-weight: bold;
  font-size: 60px;
  animation: floatUp 1s ease forwards;

  &.is-negative-points {
    color: red;
  }
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(20px);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
</style>
