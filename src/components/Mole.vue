<template>
  <div class="mole">
    <div v-if="type === MOLE_TYPES.STAR">⭐</div>
    <div v-else class="holding-wrapper">
      🐹
      <div v-if="type === MOLE_TYPES.BOMB" class="holding">💣</div>
      <div class="holding" v-else-if="type === MOLE_TYPES.GRAPE">🍇</div>
      <div class="holding" v-else-if="type === MOLE_TYPES.BLUEBERRY">🫐</div>
    </div>
  </div>
</template>

<script>
import { MOLE_TYPES } from '@/constants/constants';

export default {
  name: 'Item',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      MOLE_TYPES, // for template access
    };
  },
};
</script>

<style scoped lang="scss">
.mole {
  font-size: 3.5rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }

  .holding-wrapper {
    position: relative;

    .holding {
      position: absolute;
      bottom: -6px;
      right: -6px;
      font-size: 1.5rem;

      @media (max-width: 600px) {
        font-size: 1rem;
      }
    }
  }
}
</style>
