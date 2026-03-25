<template>
  <div class="mole">🐹</div>
</template>

<script>
export default {
  name: 'Mole',
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
