<script>
import Game from '@/components/Game.vue';
import WaitScreen from '@/components/WaitScreen.vue';
import { useSocketStore } from '@/stores/socketStore';

export default {
  name: 'App',
  components: { Game, WaitScreen },
  watch: {
    'socketStore.connected'(newValue) {
      this.isReady = newValue;
    },
  },
  data() {
    return {
      isReady: false,
      socketStore: useSocketStore(),
    };
  },
  mounted() {
    this.socketStore.connectToServer();
  },
};
</script>

<template>
  <div class="app">
    <WaitScreen v-if="!isReady" />
    <Game v-else />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  user-select: none;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
