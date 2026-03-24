<template>
  <div class="score-board">
    <div v-for="(player, id) in store.players" :key="id">
      <div class="player">
        <div class="name">{{ player.name }}</div>
        <div class="score">{{ player.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';

export default {
  name: 'ScoreBoard',
  data() {
    return {
      store: useGameStore(),
    };
  },
};
</script>

<style scoped lang="scss">
.score-board {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    font-weight: bold;

    .name {
      justify-content: left;
    }
    .score {
      color: green;
    }
  }
}
</style>
