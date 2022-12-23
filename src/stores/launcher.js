import {
  writable,
} from "svelte/store";
import {
  parse
} from "qs";

const defaultParams = {
  launcherData: {},
  redirectPageUrl: ""
};

function createLauncher () {
  const {
    subscribe,
    set,
    update
  } = writable(defaultParams);

  return {
    subscribe,
    getLauncherStr (str) {
      const beginIdx = str.indexOf("click");
      const endIdx = str.indexOf("launcher");
      const resultStr = decodeURIComponent(str.substring(beginIdx, endIdx + 8));
      update((value) => ({
        ...value,
        launcherData: parse(resultStr),
      }))
    },
    setLauncherUrl (url) {
      update((value) => ({
        ...value,
        redirectPageUrl: url
      }))
    },
    reset () {
      set(defaultParams);
    }
  };
}

export const launcher = createLauncher();