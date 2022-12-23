import { writable } from "svelte/store";
import { ONE_SECOND_TIMER } from "utils/constant";

const paramsDefault = {
  type: "",
  message: "",
  styles: {},
  timeDelay: 0,
};

function createToastStore () {
  const { subscribe, set, update } = writable(paramsDefault);
  return {
    subscribe,
    show (type, message, time = ONE_SECOND_TIMER * 2, styles = {}) {
      update((data) => ({
        ...data,
        type,
        message,
        styles,
      }));
      const showToastTimer = setTimeout(() => {
        set(paramsDefault);
        clearTimeout(showToastTimer);
      }, time);
    },
    reset() {
      set(paramsDefault);
    }
  };
}
export const toastStore = createToastStore();
