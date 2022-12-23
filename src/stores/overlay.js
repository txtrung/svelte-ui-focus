import { focus } from "store/focus.js";
import { writable, get } from "svelte/store";
import { keyboardStore } from "./keyboard";
import { OVERLAY_DURATION } from "utils/constant";

const paramsDefault = {
  list: [],
  delay: {
    open: false,
    close: false
  },
  overlayStatus: {
    name: "",
    type: "",
    isShow: false,
  },
};

function createOverlay () {
  const { subscribe, set, update } = writable(paramsDefault);
  return {
    subscribe,
    open ({ type = "", name = "", options = {} }) {
      const data = get(this);
      const focusData = get(focus);
      const overlayList = data.list;
          
      const handleUpdateStore = () => {
        update((value) => {
          if (!name) return value;
          const existItem = this.checkExist(name, type);

          if (type == "widget" && existItem) {
            let index = overlayList.findIndex((item) => item.name == name);
            index + 1 <= overlayList.length - 1 && focus.setFocusId(overlayList[index + 1].nearestFocus);
            return {
              ...value,
              list: overlayList.splice(index, 1)
            };
          }
          if (!existItem) {
            return {
              ...value,
              list: [
                ...overlayList,
                {
                  type,
                  nearestFocus: focusData.focusId,
                  name,
                  isNested: value.overlayStatus.isShow,
                  options,
                },
              ],
              overlayStatus: {
                name,
                type,
                isShow: true,
              },
            };
          }
          return value;
        });
      }

      this.setDelay(type == "widget" && !overlayList.length, handleUpdateStore, "open");
    },
    closeAll () {
      const overlay = get(this);
      const overlayList = overlay.list;
      const lastItem = overlayList[overlayList.length - 1] ?? null;
      
      if(!overlayList.length) return;
      
      const handleUpdateStore = () => {
        update((value) => ({
          ...value,
          delay: {
            ...value.delay,
            close: false,
          }, 
          list: [],
        }))
      }

      focus.setFocusId(overlayList[0].nearestFocus);

      this.setDelay(
        lastItem?.type === "widget",
        handleUpdateStore
      );
    },
    close (isSetFocus = true, animationTime = 300) {
      const overlay = get(overlayStore);
      const overlayList = overlay.list;
      const lastItem = overlayList[overlayList.length - 1] ?? null;

      const handleUpdateStore = () => {
        update((value) => {
          if (overlayList.length) {
            if (lastItem.type === "keyboard") {
              keyboardStore.close();
            }
            if (isSetFocus && lastItem) {
              const focusId = lastItem.nearestFocus;
              focus.setFocusId(focusId);
            }
            const newList = overlayList.slice(0, overlayList.length - 1);
            return {
              ...value,
              list: [...newList] ?? [],
              delay: {
                ...value.delay,
                close: false,
              },
              overlayStatus: {
                name: newList[newList.length - 1]?.name ?? "",
                type: newList[newList.length - 1]?.type ?? "",
                isShow: lastItem?.isNested ?? false,
              },
            };
          }
          return value;
        });
      }

      this.setDelay(
        lastItem?.type === "widget" && overlayList.length <= 1, 
        handleUpdateStore,
      );
    },
    setDelay (condition = false, callback, type = "close", delayTimer = OVERLAY_DURATION) {
      if (condition) {
        update((value) => ({
          ...value,
          delay:  {
            ...value.delay,
            [type]: true
          }
        }));
        const timer = setTimeout(() => {
          callback();
          clearTimeout(timer);
        }, delayTimer);
      } else {
        if (type === "open") {
          update((value) => ({
            ...value,
            delay: {
              ...value.delay,
              [type]: false
            }
          }));
        }
        callback();
      }
    },
    checkExist (name, type = '') {
      const overlay = get(overlayStore);
      const overlayList = overlay.list ?? [];
      if (type) {
        return overlayList.some(item => item.name == name && item.type == type);
      }
      return overlayList.some(item => item.name == name);
    },
    getInfo (name) {
      const overlay = get(overlayStore);
      const overlayList = overlay.list;
      return overlayList.find(item => item.name === name);
    },
    lastItem () {
      const overlay = get(overlayStore);
      const overlayList = overlay.list;
      if(!overlayList.length) return null;
      return overlayList[overlayList.length - 1];
    },
    reset () {
      set(paramsDefault);
    },
    import (arr) {
      update((value) => ({
        ...value,
        list: [...value.list, ...arr],
        overlayStatus: {
          ...value.overlayStatus,
          isShow: true,
        },
      }));
    },
  };
}
export const overlayStore = createOverlay();
