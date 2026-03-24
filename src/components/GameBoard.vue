<template>
  <div class="game-board">
    <div class="holes-wrapper">
      <MoleHole v-for="i in 9" :key="i" :index="i" />
    </div>
  </div>
</template>

<script>
import MoleHole from '@/components/MoleHole.vue';

export default {
  name: 'GameBoard',
  components: { MoleHole },
};
</script>

<style scoped lang="scss">
.game-board {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .holes-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: min(90vw, 500px);
    max-width: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    user-select: none;
    align-items: center;
    justify-content: center;
  }
}
</style>
