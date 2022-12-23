<script>
    import logo from '$libs/assets/Omnishop_logo.png';
	import MenuItem from "./MenuItem.svelte";

    export let hasFocusedChild = false;
    export let focused = false;

    export let styles = { container: {} },
    parentVertical = null,
    downPosition = {
      left: { value: "", field: "" },
      right: { value: "", field: "" },
    },
    isHidenMenu = false;
    
</script>

<div class="flex-1 max-w-[246px] flex flex-col items-center {hasFocusedChild ? "bg-[#4e4181]" : "bg-[#362C56]"} pt-[37px]">
    <img src={logo} alt='' class="h-[57px] w-[175px] mb-[51px]"/>
    <MenuItem focused={focused} />
    <MenuItem focused={true} />
    <MenuItem focused={true} />
    <MenuItem focused={true} />
    <MenuItem focused={true} />
</div>