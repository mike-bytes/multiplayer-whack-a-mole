<template>
  <div class="wait-screen">
    <div class="title">Welcome to Multiplayer Whack-a-Mole</div>
    <NameInput v-if="showNameInput" v-model="userName" @done="handleUserName" />
    <Instructions v-else />
    <div>
      <div v-if="showMessages && !isReady" class="message">
        {{ WAITING_MESSAGES[currentIndex] }}<AnimatedDots />
      </div>
      <div v-if="!showNameInput && isReady">
        <div v-if="gameStore.countdown > 0">Game starts in {{ gameStore.countdown }}</div>
        <Button v-if="!waitingAnotherPlayer" @click="handleReady">Ready to Play</Button>
        <div v-if="waitingAnotherPlayer && gameStore.countdown <= 0">
          Waiting for opponents<AnimatedDots />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WAITING_MESSAGES } from '@/shared/constants';
import { useGameStore } from '@/stores/gameStore';
import { useSocketStore } from '@/stores/socketStore';
import NameInput from '@/components/NameInput.vue';
import Button from '@/components/Button.vue';
import AnimatedDots from '@/components/AnimatedDots.vue';
import Instructions from '@/components/game/Instructions.vue';

export default {
  name: 'WaitScreen',
  components: { NameInput, Button, AnimatedDots, Instructions },
  data() {
    return {
      WAITING_MESSAGES, // for template access
      gameStore: useGameStore(),
      socketStore: useSocketStore(),

      currentIndex: 0,
      messageInterval: null,
      userName: '',
      showNameInput: true,
      showMessages: false,
      doneInterval: null,
      waitingAnotherPlayer: false,
      isReady: false,
    };
  },
  watch: {
    'socketStore.connected'(val) {
      if (val) {
        if (this.messageInterval) {
          clearInterval(this.messageInterval);
          this.messageInterval = null;
        }
        this.isReady = true;
      }
    },
  },
  mounted() {
    this.socketStore.connectToServer();
    this.socketStore.socket.on('startCountdown', this.startCountdownHandler);
  },
  unmounted() {
    this.socketStore.socket.off('startCountdown', this.startCountdownHandler);
    clearInterval(this.messageInterval);
    clearInterval(this.doneInterval);
    this.gameStore.stopCountdown();
  },
  methods: {
    handleUserName() {
      this.showNameInput = false;
      this.showMessages = true;

      this.messageInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % WAITING_MESSAGES.length;
      }, 4000);
    },
    handleReady() {
      if (!this.userName) return;
      // do this only after isReady since the server may be spinning up earlier
      this.socketStore.socket.emit('addPlayer', this.userName);
      this.socketStore.socket.emit('readyPlayer', this.userName);
      this.waitingAnotherPlayer = true;
    },
    async startCountdownHandler(endTime) {
      console.log('start coundown wait scren');
      await this.gameStore.startCountdown(endTime);
      this.$emit('done');
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/mixins' as *;

.wait-screen {
  @include screen-base;

  .title {
    padding: 20px;
    font-weight: bold;
  }

  .message {
    animation: fadeIn 0.5s ease;
    padding: 20px;
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
