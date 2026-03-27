<template>
  <span class="dots"></span>
</template>

<script>
export default {
  name: 'Dots',
};
</script>

<style scoped>
.dots::after {
  content: '';
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dotPulse 2s steps(3, end) infinite;
}

@keyframes dotPulse {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}
</style>
