<template>
  <div class="game-board">
    <div class="holes-wrapper">
      <MoleHole
        :class="{ gameOver: gameStore.winner }"
        v-for="i in NUM_HOLES"
        :key="i"
        :index="i - 1"
      />
    </div>
  </div>
</template>

<script>
import MoleHole from '@/components/MoleHole.vue';
import { NUM_HOLES } from '@/shared/constants';
import { useGameStore } from '@/stores/gameStore';

export default {
  name: 'GameBoard',
  components: { MoleHole },
  data() {
    return {
      NUM_HOLES, // for template access
      gameStore: useGameStore(),
    };
  },
};
</script>

<style scoped lang="scss">
.game-board {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

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
