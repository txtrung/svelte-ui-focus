import { writable, get } from "svelte/store";
import {
  ARROWLEFT,
  ARROWRIGHT,
  ARROWUP,
  ARROWDOWN,
  ENTER
} from "$utils/keyboard.js";
import { scrollToPosition } from "$utils/scroll";
import { getTranslateY } from "$utils/dom";
import { DIRECTION_HANDLE_DELAY_TIMER } from "$utils/constant";

const paramsDefault = {
  elements: new Map(),
  focusId: null,
  focusHistory: {},
  copyFocusHistory: {},
  autoScroll: {},
};

function createFocus() {
  const focusStore = writable(paramsDefault);
  const { subscribe, set, update } = focusStore;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  let oldTime, newTime, lastKey;
  const directionKeycodes = [ARROWLEFT, ARROWRIGHT, ARROWUP, ARROWDOWN];
  return {
    subscribe,
    set,
    update,
    // @ts-ignore
    addElement(element) {
      if (element.id) {
        const dataStore = get(focusStore);
        //update element
        update((value) => {
          const elements = new Map(value.elements);
          elements.set(element.id, element);
          return {
            ...value,
            elements,
          };
        });
        if (!dataStore.focusId || element.isDefaultFocus) {
          update((value) => ({
            ...value,
            focusId: element.id,
            detail: element,
          }));
        }
      }
    },
    // @ts-ignore
    removeElement(id) {
      if (id) {
        update((value) => {
          let { elements: elementList, focusHistory } = value;
          const element = elementList.get(id);
          if (element) {
            const { outFocusId } = element;
            // @ts-ignore
            if (focusHistory[element.parentId])
              // @ts-ignore
              delete focusHistory[element.parentId];
            elementList.delete(id);
            if (outFocusId) {
              return {
                ...value,
                focusId: outFocusId,
                detail: value.elements.get(outFocusId),
              };
            }
          }

          return value;
        });
      }
    },
    
    // @ts-ignore
    handleFocus(keyCode) {
      /**
       * Create timer to prevent consecutive scroll focus with direction keycodes:
       * 1. With direction keycodes, timeDelay is always 30ms.
       * 2. lastKey will be reset after timeDelay.
       */
      const timeDelay = directionKeycodes.includes(keyCode) ? DIRECTION_HANDLE_DELAY_TIMER : 0;
      newTime = new Date().getTime();
      // @ts-ignore
      if (!oldTime) {
        oldTime = newTime - timeDelay;
        // @ts-ignore
        lastKey = keyCode;
      }
      if (newTime - oldTime >= timeDelay) {
        oldTime = newTime;

        /**
         * Codes below are logic about direction scrolling
         * 1. With direction keycodes: return focusId
         * 2. width others: handle logic
         */
        const dataStore = get(focusStore);
        let {
          focusId: currentFocus,
          elements: elementList,
          focusHistory,
        } = dataStore;
        const infoCurrentFocus = elementList.get(currentFocus);
        if (infoCurrentFocus) {
          let { parentId: parentIdCurrentFocus = null } = infoCurrentFocus;
          const updateFocusHistory = () => {
            if (parentIdCurrentFocus) {
              focusHistory = {
                ...focusHistory,
                [parentIdCurrentFocus]: currentFocus,
              };
              update((value) => ({
                ...value,
                focusHistory: focusHistory,
                copyFocusHistory: JSON.parse(JSON.stringify(focusHistory)),
              }));
            }
          };
          /** begin define next focus + action when user press key */
          const direction = {
            [ARROWLEFT]: "prev",
            [ARROWUP]: "up",
            [ARROWRIGHT]: "next",
            [ARROWDOWN]: "down",
          };
          // @ts-ignore
          let field = direction[keyCode];
          if (field) {
            const handleDirection = () => {
              let changedFocus = infoCurrentFocus[field];
              if (typeof changedFocus === "function") {
                changedFocus = changedFocus();
              }

              let infoChangedFocus =
                changedFocus !== currentFocus && changedFocus
                  ? elementList.get(changedFocus)
                  : infoCurrentFocus;

              if (!infoChangedFocus) throw new Error("Element doesn't exist");

              /** dispatch a keypress event: action depends on old focus */
              let keydown = infoCurrentFocus["onKeyDown"];

              if (keydown && typeof keydown === "function") {
                keydown(keyCode);
              }
              if (changedFocus != currentFocus) {
                updateFocusHistory();
                update((value) => ({
                  ...value,
                  focusId: infoChangedFocus.id,
                  detail: infoChangedFocus,
                }));
              }
              /** dispatch a hover event: action depends on new focus  (tracking)*/
              const hover = infoChangedFocus["onHover"];
              if (hover && typeof hover === "function" && currentFocus !== changedFocus) {
                hover(keyCode);
              }
              return;
            }

            handleDirection();
            // @ts-ignore
            lastKey = keyCode;
            return;
          }
          if (keyCode === ENTER) {
            if (parentIdCurrentFocus) {
              updateFocusHistory();
            }
            let submit = infoCurrentFocus["onSubmit"];
            if (submit && typeof submit === "function") {
              let { id, value } = infoCurrentFocus;
              submit({
                id,
                value,
              });
            }
            return;
          }
          /** end define next focus + action when user press key */
        }
      }
    },
    
    calScrollId(
      // @ts-ignore
      id,
      // @ts-ignore
      parentId,
      // @ts-ignore
      parentVertical,
      // @ts-ignore
      scrollPosition,
      // @ts-ignore
      scrollPositionValue
    ) {
      const ele = document.getElementById(id);
      if (!ele) return;
      const style = getComputedStyle(ele);
      const rectEle = ele.getBoundingClientRect();

      //tính toán khoảng cách phần từ con tới phần từ cha bao ngoài
      const parentHorizontalEle = document.getElementById(parentId);

      if (ele && parentId && parentHorizontalEle) {
        parentHorizontalEle.style.width = "fit-content";
        parentHorizontalEle.style.overflowX = "unset";
        const rectParentEle = parentHorizontalEle.getBoundingClientRect();

        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);

        //scroll Horizontal
        const screenWidth = Math.min(
          document.documentElement.clientWidth,
          // @ts-ignore
          parentHorizontalEle.parentElement.clientWidth
        );

        let position = null;
        if (
          scrollPositionValue &&
          scrollPositionValue > 0 &&
          (scrollPosition == "left" || scrollPosition == "right")
        ) {
          if (scrollPosition == "left") {
            position = scrollPositionValue;
          }
          if (scrollPosition == "right") {
            position =
              scrollPositionValue + ele.offsetWidth + marginLeft + marginRight;
          }
        } else {
          position =
            (screenWidth - (ele.offsetWidth + marginLeft + marginRight)) / 2;
        }
        let distanceScroll =
          rectEle.left - rectParentEle.left - marginLeft - position;
        if (parentHorizontalEle.offsetWidth - distanceScroll < screenWidth)
          distanceScroll = parentHorizontalEle.offsetWidth - screenWidth;
        // @ts-ignore
        ele.dataset["distanceScroll"] = distanceScroll;
      }

      //Scroll Vertical
      const parentVerticalEle = document.getElementById(parentVertical);
      if (ele && parentVertical && parentVerticalEle) {
        parentVerticalEle.style.height = "fit-content";
        parentVerticalEle.style.overflowY = "unset";
        const rectParentEle = parentVerticalEle.getBoundingClientRect();
        const transformY = getTranslateY(parentVerticalEle);
   

        let screenHeight =
          window.innerHeight - rectParentEle.top + transformY;
        // please test this height for me
        
        // Vertical Scroll Ads element 
        const verticalScrollEle = parentVerticalEle.closest(".vertical-scroll");
        if (verticalScrollEle) {
          // @ts-ignore
          screenHeight = verticalScrollEle.offsetHeight + transformY;
        }

        let position = null;
        let distanceScrollVertical = 0;
        let scrollChecking = null;
        if (
          scrollPositionValue &&
          (scrollPosition == "top" || scrollPosition == "bottom")
        ) {
          if (scrollPosition == "top") {
            distanceScrollVertical = scrollPositionValue;
          }
          if (scrollPosition == "bottom") {
            distanceScrollVertical = scrollPositionValue + ele.offsetHeight;
          }
        } else {
          position = (screenHeight - ele.offsetHeight) / 2;
          distanceScrollVertical = rectEle.top - rectParentEle.top - position;
          scrollChecking =  parentVerticalEle.offsetHeight - distanceScrollVertical;
          
          if (scrollChecking < screenHeight) {
            distanceScrollVertical =
              parentVerticalEle.offsetHeight - screenHeight + 30;
          }
        }
        // @ts-ignore
        ele.dataset["distanceScrollVertical"] = distanceScrollVertical;
      }
    },
    // @ts-ignore
    setFocusId(id) {
      update((value) => ({
        ...value,
        focusId: id,
        detail: id ? null : value.elements.get(id),
      }));
    },
    async setAutoScroll(autoParams = {}) {
      const {
        // @ts-ignore
        type = "",
        // @ts-ignore
        id = "",
        // @ts-ignore
        isFocus = false,
        // @ts-ignore
        isHistory = false,
      } = autoParams;
      isFocus && this.setFocusId(id);
      await update((params) => {
        if (id && type) {
          return {
            ...params,
            autoScroll: {
              isOn: true,
              id,
              type,
              isFocus,
              isHistory,
            },
          };
        } else {
          return {
            ...params,
            autoScroll: {
              isOn: false,
            },
          };
        }
      });
      scrollToPosition();
    },
    // @ts-ignore
    setHistory(data) {
      update((params) => ({
        ...params,
        focusHistory: data,
      }));
    },
    reCalScroll() {
      let focusStore = get(focus);
      if (!focusStore.elements.size) return;
      focusStore.elements.forEach((item) => {
        let {
          id,
          parentId = "",
          parentVertical = "",
          scrollPosition,
          scrollPositionValue,
        } = item;
        this.calScrollId(
          id,
          parentId,
          parentVertical,
          scrollPosition,
          scrollPositionValue
        );
      });
    },
    // @ts-ignore
    checkElmInViewport(el) {
      if (!el) return false;

      const rect = el.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const vertInView =
        rect.top <= windowHeight && rect.top + rect.height >= 0;
      const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    },
    resetElement() {
      update((params) => ({
        ...params,
        elements: new Map(),
      }));
    },
  };
}
export const focus = createFocus();
