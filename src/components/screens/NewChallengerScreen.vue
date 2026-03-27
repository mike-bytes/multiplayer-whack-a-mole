<template>
  <div class="new-challenger-screen">
    <div class="challenge-wrapper" v-if="!isReady">
      A new challenger has arrived!
      <Button @click="handleReady">Ready to Play</Button>
    </div>
    <div v-if="isReady">
      <div v-if="gameStore.countdown > 0">Game starts in {{ gameStore.countdown }}</div>
      <div v-else>Waiting for other players<AnimatedDots /></div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';
import { useSocketStore } from '@/stores/socketStore';
import Button from '@/components/Button.vue';
import AnimatedDots from '@/components/AnimatedDots.vue';

export default {
  name: 'NewChallengerScreen',
  components: { Button, AnimatedDots },
  data() {
    return {
      gameStore: useGameStore(),
      socketStore: useSocketStore(),
      interval: null,
      isReady: false,
    };
  },
  emits: ['done'],
  mounted() {
    this.socketStore.socket.on('startCountdown', this.startCountdownHandler);
  },
  unmounted() {
    this.socketStore.socket.off('startCountdown', this.startCountdownHandler);
    if (this.interval) clearInterval(this.interval);
  },
  methods: {
    async startCountdownHandler(endTime) {
      await this.gameStore.startCountdown(endTime);
      this.$emit('done');
    },
    handleReady() {
      this.socketStore.socket.emit('playerReady');
      this.isReady = true;
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.new-challenger-screen {
  @include screen-base;

  .challenge-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .message {
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
