<template>
  <div class="wait-screen">
    <NameInput v-if="showNameInput" v-model="userName" @done="handleUserName" />
    <div>
      <div v-if="showMessages && !isReady" class="message">
        {{ WAITING_MESSAGES[currentIndex] }}<span class="dots"></span>
      </div>
      <div v-if="!showNameInput && isReady">
        <div v-if="gameStore.countdown > 0">Game starts in {{ gameStore.countdown }}</div>
        <Button v-if="!waitingAnotherPlayer" @click="handleReady">Ready to Play</Button>
        <div v-if="waitingAnotherPlayer && gameStore.countdown <= 0">
          Waiting for another player to join<span class="dots" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WAITING_MESSAGES } from '@/shared/constants';
import NameInput from '@/components/NameInput.vue';
import Button from '@/components/Button.vue';
import { useGameStore } from '@/stores/gameStore';
import { useSocketStore } from '@/stores/socketStore';

export default {
  name: 'WaitScreen',
  components: { NameInput, Button },
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
      interval: null,
      waitingAnotherPlayer: false,
    };
  },
  computed: {
    isReady() {
      const connected = this.socketStore.connected;

      if (connected && this.messageInterval) {
        clearInterval(this.messageInterval);
        this.messageInterval = null;
      }
      return connected;
    },
  },
  mounted() {
    this.socketStore.connectToServer();
    this.socketStore.socket.on('startCountdown', this.startCountdownHandler);
  },
  unmounted() {
    this.socketStore.socket.off('startCountdown', this.startCountdownHandler);
    clearInterval(this.messageInterval);
    clearInterval(this.interval);
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
      this.socketStore.socket.emit('addPlayer', this.userName);
      this.waitingAnotherPlayer = true;
    },
    startCountdownHandler(endTime) {
      console.log('startcountdown');
      this.showMessages = false;
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);
        this.gameStore.countdown = Math.max(remaining, 0);

        if (remaining <= 0) {
          clearInterval(this.interval);
          this.$emit('done');
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.wait-screen {
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

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

  .dots::after {
    content: '';
    display: inline-block;
    width: 3ch;
    text-align: left;
    animation: dotPulse 2s steps(3, end) infinite;
  }

  @keyframes dotPulse {
    0% {
      content: '';
    }
    33% {
      content: '.';
    }
    66% {
      content: '..';
    }
    100% {
      content: '...';
    }
  }
}
</style>
