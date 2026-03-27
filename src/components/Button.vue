<template>
  <button class="button">
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
});
</script>

<style lang="scss">
.button {
  min-height: 36px;
  min-width: 36px;
  padding: 6px 12px;
  touch-action: manipulation;
  font-size: 1.1em;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: white;
  }

  &:disabled {
    opacity: 0.5;
    background-color: grey !important;
    cursor: default;
    pointer-events: none;
  }
}
</style>
