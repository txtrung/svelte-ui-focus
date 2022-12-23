import { layoutStore } from "$stores/layout";
import { focus } from "$stores/focus.js";
import { writable, get } from "svelte/store";
import { overlayStore } from "./overlay";

const paramsDefault = {
  list: new Map(),
  /* info of current page */
  info: null,
};

function createHistoryStore () {
  const { subscribe, update } = writable(paramsDefault);
  return {
    subscribe,
    page () {
      let layout = get(layoutStore);
      let { currentPage } = layout;
      if (!currentPage) return;
      let historyData = null;
      let { list: historyList } = get(historyStore);
      let newHistoryList = new Map(historyList);
      let isExistPage = false;
      return {
        snapshot (data) {
          let { isBackToPreviousPage } = get(historyStore);
          update((params) => {
            if (isBackToPreviousPage) {
              return {
                ...params,
                info: null,
                isBackToPreviousPage: false,
              };
            }
            let focusStore = get(focus);
            let { focusId, copyFocusHistory: focusHistory } = focusStore;
            let overlay = get(overlayStore);
            let overlayList = overlay.list;
            if (data) {
              newHistoryList.set(currentPage, {
                focusId,
                focusHistory,
                overlay: overlayList,
                ...data,
              });
              return {
                ...params,
                list: newHistoryList,
                info: null,
              };
            }
          });
        },
        checkExist () {
          isExistPage = historyList.has(currentPage);
          isExistPage && this.getInfo();
          return isExistPage;
        },
        getInfo () {
          historyData = historyList.get(currentPage);
          historyList.delete(currentPage);
          update((value) => ({
            ...value,
            info: historyData,
            list: historyList,
            isBackToPreviousPage: false,
          }));
          return historyData;
        },
        setFocus: async () => {
          let { focusId, focusHistory } = historyData;
          for (const key in focusHistory) {
            let elm = focusHistory[key];
            await focus.setAutoScroll({
              isHistory: true,
              type: elm === focusId ? "mix" : "horizontal",
              id: elm,
              isFocus: elm === focusId,
            });
          }
          console.timeEnd("Time this");
        },
      };
    },
    removeList: () => {
      let layout = get(layoutStore);
      let { currentPage } = layout;
      update((params) => {
        let historyList = params.list;
        historyList.delete(currentPage);
        return {
          ...params,
          info: null,
          list: historyList,
        };
      });
    },
    setPreviousPage (value) {
      update((params) => ({
        ...params,
        isBackToPreviousPage: value,
      }));
    },
  };
}
export const historyStore = createHistoryStore();
