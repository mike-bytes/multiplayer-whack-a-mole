<template>
  <div v-show="swing" class="mallet" :class="{ swing }">🔨</div>
</template>

<script>
export default {
  name: 'Mallet',
  props: {
    swing: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
