import {
  SCROLL_DURATION,
  ONE_SECOND_TIMER,
  TRANSITION_TIMING_FUNCTION,
} from "utils/constant";
import {
  focus
} from "store/focus.js";
import {
  get
} from "svelte/store";
import {
  ARROWUP,
  ARROWDOWN,
  ARROWLEFT,
  ARROWRIGHT
} from "utils/keyboard.js";

export function smoothHorizontalScrollTransform({
  elementId,
  elementScrollId,
  duration = SCROLL_DURATION,
  isHistoryLoad,
}) {
  const element = document.getElementById(elementId);
  const scrollElement = document.getElementById(elementScrollId);
  if (!element || !scrollElement) return;

  const distanceScroll = +element.dataset["distanceScroll"] || 0;

  if (distanceScroll > 0) {
    if (!isHistoryLoad)
      scrollElement.style.transition = `transform ${duration / ONE_SECOND_TIMER}s`;
    scrollElement.style.transform = `translateX(${-distanceScroll}px)`;
  } else {
    if (!isHistoryLoad)
      scrollElement.style.transition = `transform ${duration / ONE_SECOND_TIMER}s`;
    scrollElement.style.transform = `translateX(${0}px)`;
  }
  scrollElement.style.transitionTimingFunction = TRANSITION_TIMING_FUNCTION;
  requestAnimationFrame(smoothHorizontalScrollTransform);
}

export function smoothVerticalScrollTransform({
  elementId,
  duration = SCROLL_DURATION,
  elementScrollId,
  isHistoryLoad
}) {
  const element = document.getElementById(elementId);
  const scrollElement = document.getElementById(elementScrollId);
  if (!element || !scrollElement) return;
  const distanceScroll = +element.dataset["distanceScrollVertical"] || 0;

  if (!isHistoryLoad)
    scrollElement.style.transition = `transform ${duration / ONE_SECOND_TIMER}s`;
  if (distanceScroll > 0) {
    scrollElement.style.transform = `translateY(${-distanceScroll}px)`;
  } else {
    scrollElement.style.transform = `translateY(${0}px)`;
  }

  scrollElement.style.transitionTimingFunction = TRANSITION_TIMING_FUNCTION;
  requestAnimationFrame(smoothHorizontalScrollTransform);
}

export function scrollToPosition(currentKey = null) {
  let focusStore = get(focus);
  let focusId = focusStore.focusId;
  let id = focusId,
    isHistoryLoad = false,
    typeAutoScroll = null;
  let parentHorId, parentVerId;

  let autoScroll = focusStore.autoScroll;
  let isOnAutoScroll = autoScroll.isOn;
  /**
   * 1. autoscroll : không có animation khi scroll
   * 2. scroll 'bình thường': có animation khi scroll
   */
  if (isOnAutoScroll) {
    ({
      isHistory: isHistoryLoad,
      id,
      type: typeAutoScroll
    } = autoScroll);
  }


  let infoElm = focusStore.elements.get(id);
  infoElm &&
    ({
      parentId: parentHorId = null,
      parentVertical: parentVerId = null
    } = infoElm);
  /**
   * scroll dọc + ngang cùng lúc :
   * 1. autoscroll + kiểu scroll = vertical + element scroll = focusID
   */
  if (
    isOnAutoScroll &&
    typeAutoScroll === "mix" &&
    id === focusStore.focusId
  ) {
    try {
      smoothHorizontalScrollTransform({
        elementId: id,
        elementScrollId: parentHorId,
        isHistoryLoad
      });
      smoothVerticalScrollTransform({
        elementId: id,
        elementScrollId: parentVerId,
        isHistoryLoad
      });
      isOnAutoScroll && focus.setAutoScroll();
    } catch (err) {
      throw new Error("Lỗi", err);
    }
  } else if (
    /**
     * scroll ngang :
     * 1. autoscroll + kiểu scroll = horizontal
     * 2. nhấn ArrowLeft / ArrowRight
     */
    (isOnAutoScroll && typeAutoScroll === "horizontal" && parentHorId) ||
    (currentKey === ARROWLEFT || currentKey === ARROWRIGHT)
  ) {
    try {
      requestAnimationFrame(() => {
        smoothHorizontalScrollTransform({
          elementId: id,
          elementScrollId: parentHorId,
          isHistoryLoad
        });
      });
      isOnAutoScroll && focus.setAutoScroll();
    } catch (err) {
      throw new Error("Lỗi", err);
    }
  } else if (
    /**
     * scroll dọc :
     * 1. autoscroll + kiểu scroll = vertical
     * 2. nhấn ArrowUp / ArrowDown
     */
    (isOnAutoScroll && typeAutoScroll === "vertical" && parentVerId) ||
    (currentKey === ARROWUP || currentKey === ARROWDOWN)
  ) {
    try {
      requestAnimationFrame(() => {
        smoothVerticalScrollTransform({
          elementId: id,
          elementScrollId: parentVerId,
          isHistoryLoad
        });
      });
      isOnAutoScroll && focus.setAutoScroll();
    } catch (err) {
      throw new Error("Lỗi", err);
    }
  }
}