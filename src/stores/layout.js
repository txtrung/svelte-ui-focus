import {
  writable,
  get
} from "svelte/store";
const paramsDefault = {
  type: null,
  message: "",
  userPage: "",
  currentPage: {
    sidebar: '',
    content: '',
  },
  currentUrl: '',
  isOpenFromAppBar: false,
  isReCalScroll: false
};

function createLayoutStore () {
  const {
    subscribe,
    set,
    update
  } = writable(paramsDefault);
  return {
    subscribe,
    set,
    setLayoutUserPage (content = "") {
      let sidebar = "";
      if(content) {
        sidebar = content.split('/')[0]
      }
      update(params => ({
        ...params,
        userPage: {
          content,
          sidebar
        }
      }))
    },
    uppercaseTextPage () {
      const layout = get(layoutStore);
      return layout.currentPage.toUpperCase();
    },
    setPage (page) {
      update((data) => ({
        ...data,
        currentPage: page,
      }));
    },
    setURLPage (url) {
      update((data) => ({
        ...data,
        urlPage: url,
      }));
    },
    setCurrentUrl (location) {
      const locateStr = location.substring(1, location.length);
      update((value) => ({
        ...value,
        currentUrl: locateStr || "",
      }))
    },
    setReCalScroll () {
      update((data) => ({
        ...data,
        isReCalScroll: !data.isReCalScroll
      }));
    },
    setOpenFromAppBar (bool) {
      update((value) => ({
        ...value,
        isOpenFromAppBar: bool
      }))
    }
  };
}
export const layoutStore = createLayoutStore();
