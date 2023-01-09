<script>
    import "../app.css";
    import { focus } from "$stores/focus.js";
    import { layoutStore } from "$stores/layout.js";
    import { historyStore } from "$stores/history.js";
    import { overlayStore } from "$stores/overlay.js";
    import { onDestroy, onMount } from "svelte";
	import Menu from "$components/app-bar/Menu.svelte";
	import FocusScroll from "$components/global/FocusScroll.svelte";

    export let name = "",
        classElm = "",
        idElm = "",
        menuElm = {
            isShow: true,
            isHidenMenu: false,
            styles: {
                container: "",
            },
            downPosition: {
                left: { value: "", field: "" },
                right: { value: "", field: "" },
            },
        };

    export let historyFunction = null,
        historyData = null,
        isLoadHistory = false,
        isHandleHistory = false;

    onMount(async () => {
        /* set page */
        name && layoutStore.setPage(name);
        /* history */
        historyFunction = historyStore.page();

        // @ts-ignore
        isLoadHistory = historyFunction.checkExist();
        if (isLoadHistory) {
            historyData = $historyStore.info;
            let { 
                // @ts-ignore
                overlay: overlayList = [], 
                // @ts-ignore
                focusHistory = null 
            } = historyData;
            if (overlayList.length) {
                overlayStore.import(overlayList);
            }
            if (focusHistory) {
                focus.setHistory(focusHistory);
                // @ts-ignore
                historyFunction.setFocus();
            }
        }
        isHandleHistory = true;
    });

    onDestroy(() => {
        overlayStore.reset();
    });

    let content;

</script>

<FocusScroll>
    <div class="flex" id={idElm} bind:this={content}>
        <Menu
            isHidenMenu={menuElm.isHidenMenu}
            downPosition={menuElm.downPosition}
            styles={menuElm.styles}
            parentVertical={"show-home-content"}
        />
        <slot content="body" />
    </div>
</FocusScroll>
