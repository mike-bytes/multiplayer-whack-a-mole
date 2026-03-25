<template>
  <div class="score-increment">+{{ points }}</div>
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
};
</script>

<style scoped lang="scss">
.score-increment {
  position: absolute;
  color: gold;
  font-weight: bold;
  font-size: 60px;
  animation: floatUp 1s ease forwards;
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
