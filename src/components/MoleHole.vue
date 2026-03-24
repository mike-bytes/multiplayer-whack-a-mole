<template>
  <div class="mole-hole" @click="whack">
    <div v-if="isActive" class="mole">🐹</div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import { socket } from '@/services/socket';

export default {
  name: 'MoleHole',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      store: useGameStore(),
      isClicked: false,
    };
  },
  computed: {
    isActive() {
      return this.store.activeMole === this.index;
    },
  },
  methods: {
    whack() {
      socket.emit('whack', this.index);
    },
  },
};
</script>

<style scoped lang="scss">
.mole-hole {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid #c79e7c;
  aspect-ratio: 1 / 1;
  box-sizing: border-box; // include padding/border in width
  border-radius: 50%;
  cursor: pointer;
  flex: 0 0 calc(33.333% - 30px);
  background-color: #593b22;

  &.isClicked {
    background-color: red;
  }

  .mole {
    font-size: 70px;
  }
}
</style>
