import { get } from "svelte/store";
import { loadingStore } from "$stores/loading.js";

export const ARROWLEFT = 37;
export const ARROWRIGHT = 39;
export const ARROWUP = 38;
export const ARROWDOWN = 40;
export const ENTER = 13;
export const RETURNTV = 10009;
export const RETURNWEB = 27;
export const RETURN_WEB_ADS = 8;
export const RETURN_TV_ADS = 461;
export const ESCAPE = "Escape";

const keyCodesDefault = {
  40: ARROWDOWN,
  38: ARROWUP,
  37: ARROWLEFT,
  39: ARROWRIGHT,
  13: ENTER,
  27: RETURNWEB,
  10009: RETURNTV,
  8: RETURN_WEB_ADS,
  461: RETURN_TV_ADS,
  96: "num-0",
  97: "num-1",
  98: "num-2",
  99: "num-3",
  100: "num-4",
  101: "num-5",
  102: "num-6",
  103: "num-7",
  104: "num-8",
  105: "num-9",
  403: "red",
  192: "redmote",
};

let keyHandle = () => {};
let isLoading = get(loadingStore);
let old_time, new_time;
let timeDelay = 0;
const TIME_DELAY_CONSTANT = 1500;

// xử lí event press key của page / focus component
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  const { keyCode: keyboardCode} = e;
  // keyHandle(keyCodesDefault[e.keyCode])
  if ((keyboardCode === 27 || keyboardCode === 10009) && isLoading) {
    timeDelay = TIME_DELAY_CONSTANT;
  }
  new_time = new Date().getTime();
  if (!old_time) {
    old_time = new_time - timeDelay;
  }
  if (new_time - old_time >= timeDelay + 150) {
    old_time = new_time;
    keyHandle(keyCodesDefault[keyboardCode]);
  }
});

export default function setKeyListener (componentKeyHandle) {
  keyHandle = componentKeyHandle;
}