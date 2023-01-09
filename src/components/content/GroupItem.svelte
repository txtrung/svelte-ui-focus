<script>
	import FocusComponent from "../global/FocusComponent.svelte";
    import { focus } from "$stores/focus.js";
    import { createEventDispatcher } from "svelte";
    import { asset } from "$stores/asset";

    export let uid = '', color = '', title = '', focusPosition = {};

    const dispatch = createEventDispatcher();
</script>

<FocusComponent
    let:isInViewport
    let:isFocus
    id={focusPosition.id}
    isDefaultFocus={focusPosition.isDefaultFocus}
    index={focusPosition.index}
    up={focusPosition.up ? focusPosition.up : $focus.focusHistory[focusPosition.nameUpCol] || focusPosition.upSpecialFocus || null}
    down={$focus.focusHistory[focusPosition.nameDownCol] || focusPosition.downSpecialFocus || focusPosition.down || null}
    next={focusPosition.next || null}
    prev={focusPosition.prev || null}
    parentVertical={focusPosition.parentVertical}
    parentId={focusPosition.parentId}
    scrollPosition={focusPosition.scrollPosition || null}
    scrollPositionValue={focusPosition.scrollPositionValue || null}
    outFocusId={focusPosition.outFocus}
    onSubmit={()=>{
        console.log('onSubmit');
        asset.update(data => data = {
            color: color,
            title: title
        });
    }}
    onHover={(keyCode)=>{
    //    console.log('hihihih')
    }}
    onKeyDown={(keyCode) => {
        dispatch('keydown', { keyCode });
        // console.log('kikikiki')
    }}
>
    <div id={uid} class="mr-[22px] flex flex-col">
        <div class={`w-[225px] h-[127px] border-white border-solid box-border rounded-[7px]`} style={`background-color: ${color};border-width:${isFocus?'6px':'0px'}`}>
            {color}
        </div>
        <div class="text-white mt-[10px] font-sans text-[24px] font-normal">
            {title}
        </div>
    </div>
</FocusComponent>
            