
<script>
  import { focus } from "$stores/focus.js";
  import { scrollToPosition } from '$utils/scroll.js';
  import {
    ARROWUP,
    ARROWDOWN,
    ARROWLEFT,
    ARROWRIGHT
  } from "$utils/keyboard.js";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { loadingStore } from "$stores/loading.js";
  import { DIRECTION_HANDLE_DELAY_TIMER } from "$utils/constant";
  import { browser } from "$app/environment";
  
  let lastKey = null, oldTime, newTime = new Date().getTime();

  const handleScroll = (event) => {
    const { keyCode: currentKey } = event;
    const directKey = [ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT];

    let timeDelay = DIRECTION_HANDLE_DELAY_TIMER;
    const TIME_DELAY_CONSTANT = 1500;
    const isLoading = get(loadingStore);

    if ((currentKey === 27 || currentKey === 10009) && isLoading) {
      timeDelay = TIME_DELAY_CONSTANT;
    }
    
    const handleFocusAndScroll = () => {
      focus.handleFocus(currentKey);
      directKey.includes(currentKey) && scrollToPosition(currentKey);
    };

    /**
     Hypothesis: check whether previous keycode 
      is same the current keycode  
    **/ 

    /*  - If false -> handle focus + scroll normally */ 
    if (lastKey !== currentKey) {
      handleFocusAndScroll();
      lastKey = currentKey;
    } 
    /*  
      - Else -> Use time trick (old time and new time) 
        to check whether User keeps pressing the button on remote
      -> If  the deviant of time larger than criteria 
      -> handle focus + scroll
    */ 
    else {
      if (!oldTime) {
        oldTime = newTime - timeDelay;
      }
      newTime = new Date().getTime();
      if (newTime - oldTime >= timeDelay) {
        handleFocusAndScroll();
        oldTime = newTime;
      }
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("keydown", handleScroll);
    }
  })

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("keydown", handleScroll);
    }
  })
</script>

<slot />
