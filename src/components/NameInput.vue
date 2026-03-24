<template>
  <div class="name-input">
    Name:
    <input class="field" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'NameInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
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
}
</style>
