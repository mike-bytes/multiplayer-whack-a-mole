<template>
  <div class="item">
    <div v-if="type === ITEM_TYPES.MOLE">🐹</div>
    <div v-else-if="type === ITEM_TYPES.STAR">⭐</div>
    <div v-else-if="type === ITEM_TYPES.BOMB">
      <div class="mole">
        🐹
        <div class="holding">💣</div>
      </div>
    </div>
    <div v-else-if="type === ITEM_TYPES.FRUIT">
      <div class="mole">
        🐹
        <div class="holding">🍇</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ITEM_TYPES } from '@/constants/constants';

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
      ITEM_TYPES, // for template access
    };
  },
};
</script>

<style scoped lang="scss">
.item {
  font-size: 3.5rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }

  .mole {
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
