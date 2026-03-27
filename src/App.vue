<script>
import Game from '@/components/Game.vue';
import WaitScreen from '@/components/WaitScreen.vue';

export default {
  name: 'App',
  components: { Game, WaitScreen },
  data() {
    return {
      isReady: false,
    };
  },
};
</script>

<template>
  <div class="app">
    <WaitScreen v-if="!isReady" @done="isReady = true" />
    <Game v-else />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
