<template>
  <div class='mole'">
    <div v-if="type === MOLE_TYPES.STAR">⭐</div>
    <div v-else class="holding-wrapper">
      🐹
      <div v-if="holdingItem" class="holding">
        {{ holdingItem }}
      </div>
    </div>
  </div>
</template>

<script>
import { MOLE_TYPES } from '@/shared/constants';

export default {
  name: 'Mole',
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
  computed: {
    holdingItem() {
      switch (this.type) {
        case MOLE_TYPES.BOMB:
          return '💣';
        case MOLE_TYPES.GRAPE:
          return '🍇';
        case MOLE_TYPES.BLUEBERRY:
          return '🫐';
        case MOLE_TYPES.LEMON:
          return '🍋';
        case MOLE_TYPES.THUMBS_DOWN:
          return '👎';
        case MOLE_TYPES.BANANA:
          return '🍌';
        default:
          return null;
      }
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
