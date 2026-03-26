import { describe, it, expect } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import App from '../App.vue';

describe('App', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    store = useGameStore();
    store.$reset();

    store.activeItems = [{ index: 0, type: 'mole' }];
  });

  it('mounts renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Multiplayer Whack-a-Mole');
  });
});
