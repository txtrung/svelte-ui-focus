<script>
  import { onDestroy, onMount } from "svelte";
  import { focus } from "$stores/focus.js";
  import { ARROWLEFT, ARROWRIGHT, ARROWUP, ARROWDOWN } from "$utils/keyboard";
  import { IN_VIEWPORT_DELAY_TIMER } from "$utils/constant";

  export let id,
    next = null,
    prev = null,
    up = null,
    down = null,
    index = -1,
    parentId,
    scrollPosition = null,
    scrollPositionValue = null,
    parentVertical = null,
    isDefaultFocus = false,
    outFocusId = null,
    value = "",
    onHover = {},
    onKeyDown = {},
    onSubmit = {},
    onReturn = {};

  let oldFocusData = {}, card;
  
  let isInViewport = false;
  $: isFocus = $focus.focusId == id;
  $: updatedFocusData = {
    id,
    next,
    prev,
    up,
    down,
  };

  $: if (
    isFocus &&
    JSON.stringify(updatedFocusData) !== JSON.stringify(oldFocusData)
  ) {
    focus.addElement({
      id,
      next,
      prev,
      up,
      down,
      parentId,
      parentVertical,
      outFocusId,
      scrollPosition,
      scrollPositionValue,
      index,
      onSubmit,
      onKeyDown,
      onHover,
      onReturn,
      value,
    });
    oldFocusData = { ...updatedFocusData };
  }

  let lastKey = null, intervalFocus, stopHandleTimout;
  
  const handleKeydown = (event) => {
    const { keyCode } = event;
    if (![ARROWLEFT, ARROWRIGHT, ARROWUP, ARROWDOWN].includes(keyCode)) return;

    if (lastKey !== keyCode) {
      isInViewport = focus.checkElmInViewport(card);

      intervalFocus && clearInterval(intervalFocus);
      stopHandleTimout && clearTimeout(stopHandleTimout);
    } else {
      intervalFocus = setInterval(() => {
        isInViewport = focus.checkElmInViewport(card);
        clearTimeout(stopHandleTimout);
      }, IN_VIEWPORT_DELAY_TIMER);
      
      stopHandleTimout = setTimeout(() => {
        clearInterval(intervalFocus);
        clearTimeout(stopHandleTimout);
      }, IN_VIEWPORT_DELAY_TIMER);
    }
    lastKey = keyCode;
	}

  onMount(() => {
    const inputData = {
      id,
      next,
      prev,
      up,
      down,
      parentId,
      parentVertical,
      outFocusId,
      scrollPosition,
      scrollPositionValue,
      index,
      onSubmit,
      onKeyDown,
      onHover,
      onReturn,
      value,
      isDefaultFocus,
    };
    focus.addElement(inputData);
    oldFocusData = inputData;
    focus.calScrollId(
      id,
      parentId,
      parentVertical,
      scrollPosition,
      scrollPositionValue
    );
    clearInterval(intervalFocus);
    clearTimeout(stopHandleTimout);

    const mountRenderTimer = setTimeout(() => {
      isInViewport = focus.checkElmInViewport(card);
      clearTimeout(mountRenderTimer);
    }, 0);
  });

  onDestroy(() => {
    if ($focus.elements.size > 0) {
      focus.removeElement(id);
    }
  });
</script>

<div {id} bind:this={card}>
  <slot {isFocus} {isInViewport} />
</div>

<svelte:window on:keydown={handleKeydown}/>