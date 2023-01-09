import {
  writable
} from "svelte/store";

const paramsDefault = {
  inputFocusingId: "",
  type: "text",
  option: {},
  content: {},
  isShow: false,
  more: {}
};

function createKeyboardStore () {
  const {
    subscribe,
    set,
    update
  } = writable(paramsDefault);
  return {
    subscribe,
    open ({
      type,
      inputFocusingId,
      more = {}
    }) {
      update((params) => ({
        ...params,
        type,
        inputFocusingId,
        isShow: true,
        more
      }));
    },
    close () {
      update((params) => ({
        ...params,
        inputFocusingId: "",
        isShow: false,
      }));
    },
    contentInput (data, option = {}) {
      update((params) => ({
        ...params,
        content: data,
        option,
      }));
    },
    currentField (name) {
      update((params) => ({
        ...params,
        field: name,
      }));
    },
    changeTextValueInput (field, value) {
      update((params) => ({
        ...params,
        content: {
          ...params.content,
          [field]: value,
        },
      }));
    },
    clearContent () {
      update((params) => ({
        ...params,
        content: {},
      }));
    },
    resetKeyboard () {
      set(paramsDefault);
    },
  };
}
export const keyboardStore = createKeyboardStore();