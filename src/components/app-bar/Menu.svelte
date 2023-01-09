<script>
    import { focus } from "$stores/focus.js";
    import { layoutStore } from "$stores/layout.js";
    import { goToPage } from "$utils/directPage.js";
    import { formartInlineStyle } from "$utils/common.js";
    import Button from "../global/Button.svelte";
    import logo from "$libs/assets/Omnishop_logo.png";
	import { onMount } from "svelte";
  
    export let styles = { container: {} },
      parentVertical = '',
      downPosition = {
        left: { value: "", field: "" },
        right: { value: "", field: "" },
      },
      isHidenMenu = false;
  
    let convertedMenuList = [];
    const menuList = {
        uid: 'app-bar-home-menu',
        list: [
            {
                uid: 'menu-item-1',
                title: 'Menu Item 1'
            },
            {
                uid: 'menu-item-2',
                title: 'Menu Item 2'
            },
            {
                uid: 'menu-item-3',
                title: 'Menu Item 3'
            }
        ]
    };

    console.log($focus);

   // @ts-ignore
    $: isFocusItem = menuList.list.some(object=>object.uid === $focus.focusId);

    onMount(async ()=>{
        // convertedMenuList = attachFocus(menuList);
        // console.log(convertedMenuList);
    });

  </script>

<div class="flex-1 flex flex-col items-center {isFocusItem ? "bg-[#4e4181]" : "bg-[#362C56]"} pt-[37px]">
    <img src={logo} alt='' class="h-[57px] w-[175px] mb-[51px]"/>
    <Button
        let:isFocus
        isDefaultFocus={true}
        id="menu-item-1"
        type="primary"
        next={"Recommended_Asset-1-Recommended"}
        prev={null}
        down={"menu-item-2"}
        up={null}
        styles={{ container: { background: "#c4c4c4" } }}
        name="Menu Item 1"
        parentId="app-bar-home-menu"
        on:click={() => {
            console.log('menu-item-1');
        }}
    >
        <div
            slot="content"
            class="{isFocus ? 'bg-[#4e4181]' : 'bg-[#362C56]'}"
        >
            Menu Item 1
        </div>
    </Button>
    <Button
        let:isFocus
        id="menu-item-2"
        type="primary"
        next={null}
        prev={null}
        down={"menu-item-3"}
        up={"menu-item-1"}
        styles={{ container: { background: "#c4c4c4" } }}
        name="Menu Item 2"
        parentId="app-bar-home-menu"
        on:click={() => {
            console.log('menu-item-2');
        }}
    >
        <div
            slot="content"
            class="{isFocus ? 'bg-[#4e4181]' : 'bg-[#362C56]'}"
        >
            Menu Item 2
        </div>
    </Button>
    <Button
        let:isFocus
        id="menu-item-3"
        type="primary"
        next={null}
        prev={null}
        down={null}
        up={"menu-item-2"}
        styles={{ container: { background: "#c4c4c4" } }}
        name="Menu Item 3"
        parentId="app-bar-home-menu"
        on:click={() => {
            console.log('menu-item-3');
        }}
    >
        <div
            slot="content"
            class="{isFocus ? 'bg-[#4e4181]' : 'bg-[#362C56]'}"
        >
            Menu Item 3
        </div>
    </Button>
</div>
