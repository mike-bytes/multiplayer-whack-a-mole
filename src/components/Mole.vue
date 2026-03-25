<template>
  <div class="mole">
    <div v-if="type === 'star'">⭐</div>
    <div v-else>🐹</div>
  </div>
</template>

<script>
export default {
  name: 'Mole',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.mole {
  font-size: 3.5rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
}
</style>
