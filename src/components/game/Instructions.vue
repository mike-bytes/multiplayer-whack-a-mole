<template>
  <div class="instructions">
    <div class="instructions-content">
      <p>To play, click to earn points</p>

      <div class="scoring-guide">
        <template v-for="item in items" :key="item.id">
          <div class="icon">{{ item.name }}</div>
          <div class="points">{{ item.points }} pts</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  data() {
    return {
      items: [
        { id: 1, name: '🐹', points: '+1' },
        { id: 2, name: '⭐', points: '+2' },
        { id: 3, name: '🍇🫐🍋🍌', points: '+3' },
        { id: 4, name: '💣👎', points: '-3' },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.instructions-content {
  font-size: 1rem;
  padding: 1rem;
}

.scoring-guide {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  align-items: center;
  gap: 4px;
  background-color: #444;
}

.icon {
  grid-row: 1;
  font-size: 32px;
}

.points {
  grid-row: 2;
  font-size: 14px;
  color: gold;
}
</style>
