import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/gameStore';
import MoleHole from '@/components/MoleHole.vue';
import { MOLE_TYPES } from '@/constants/constants';

// Mock the socket
vi.mock('@/services/socket', () => {
  return {
    socket: {
      emit: vi.fn(),
      on: vi.fn(),
    },
  };
});

describe('MoleHole.vue', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    store = useGameStore();
    store.$reset();

    store.activeMoles = [{ index: 0, type: MOLE_TYPES.MOLE }];
  });

  it('shows mole when active', () => {
    const wrapper = mount(MoleHole, {
      props: { index: 0 },
    });
    expect(wrapper.find('.mole').exists()).toBe(true);
  });

  it('does not show mole when inactive', () => {
    const wrapper = mount(MoleHole, { props: { index: 1 } });
    expect(wrapper.find('.mole').exists()).toBe(false);
  });

  it('emits whack event when mousedown on active mole', async () => {
    const wrapper = mount(MoleHole, {
      props: { index: 0 },
    });
    await wrapper.trigger('mousedown');
    const { socket } = await import('@/services/socket');
    expect(socket.emit).toHaveBeenCalledWith('whack', 0);
  });

  it('shows mole when active', () => {
    const wrapper = mount(MoleHole, {
      props: { index: 0 },
    });

    expect(wrapper.findComponent({ name: 'Mole' }).exists()).toBe(true);
  });
});
