import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null,
    connected: false,
    initialized: false,
  }),
  actions: {
    connectToServer() {
      if (this.socket) return; // already initialized

      this.socket = io(import.meta.env.VITE_SERVER_URL, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 2000,
      });

      this.socket.once('connect', () => {
        if (!this.initialized) {
          this.initialized = true;
          this.connected = true; // wait screen reacts to this
          console.log('connected to server');
        }
      });

      this.socket.connect();

      this.socket.on('connect_error', (err) => {
        console.log('server waking up...', err.message);
      });

      this.socket.on('disconnect', () => {
        console.log('lost connection');
        // this.connected = false;
      });

      this.socket.on('reconnect', () => {
        console.log('reconnected');
        this.connected = true;
      });
    },
  },
});
