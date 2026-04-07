<template>
  <div class="name-input">
    Your name:
    <input class="field" @input="$emit('update:modelValue', $event.target.value)" />
    <Button :disabled="!modelValue" @click="$emit('done')">Done</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'NameInput',
  components: { Button },
  props: {
    modelValue: {
      type: [String, null],
      required: true,
    },
  },
  emits: ['update:modelValue', 'done'],
};
</script>

<style scoped lang="scss">
.name-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .field {
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;
  }
  input {
    width: 110px;
    height: 50px;
  }
  button {
    font-size: 1.2rem;
  }
}
</style>
