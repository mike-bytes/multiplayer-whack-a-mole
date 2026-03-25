<template>
  <div class="score-board">
    <div v-for="player in players" :key="player.id">
      <div class="player">
        <div class="name" :key="player.score">{{ player.name }}</div>
        <div class="score" :key="player.score">{{ player.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';

export default {
  name: 'ScoreBoard',
  props: {
    shouldSort: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sortedPlayers() {
      if (!this.store.players) return [];
      return Object.values(this.store.players).sort((a, b) => b.score - a.score);
    },
    players() {
      if (this.shouldSort) {
        return this.sortedPlayers;
      } else {
        return this.store.players;
      }
    },
  },
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
  background-color: grey;
  padding: 5px 10px;
  font-size: 1.3rem;
  border-radius: 10px;

  .player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    font-weight: bold;

    .name {
      justify-content: left;
      color: white;
      animation: scorePop 0.25s ease;
    }
    .score {
      color: yellow;
      animation: scorePop 0.25s ease;
    }

    @keyframes scorePop {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.4);
        color: gold;
      }

      100% {
        transform: scale(1);
      }
    }
  }
}
</style>
