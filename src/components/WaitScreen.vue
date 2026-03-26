<template>
  <div class="wait-screen">
    <div class="message">
      {{ WAITING_MESSAGES[currentIndex] }}<span class="dots">{{ dots }}</span>
    </div>
  </div>
</template>

<script>
import { WAITING_MESSAGES } from '@/shared/constants';

export default {
  name: 'WaitScreen',
  data() {
    return {
      WAITING_MESSAGES, // for template access
      currentIndex: 0,
      dots: '',
      messageInterval: null,
      dotsInterval: null,
    };
  },
  mounted() {
    this.messageInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % WAITING_MESSAGES.length;
    }, 4000);
  },
  unmounted() {
    clearInterval(this.messageInterval);
    clearInterval(this.dotsInterval);
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
    width: 1em; // width of one dot
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
