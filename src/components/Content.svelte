<script>
	import ScrollingRows from "./ScrollingRows.svelte";

    export let selectedAsset = {
        color: '#565b6b',
        title: 'Press "Enter" to select an asset'
    };
</script>

<div class="flex-1 overflow-hidden flex flex-col">
    <div class="text-white text-[48px] font-semibold font-sans text-center mt-[52px] mb-[37px]">
        Norigin Spatial Navigation
    </div>
    <div class="relative flex flex-col items-center">
        <div class="h-[282px] w-[1074px] bg-[{selectedAsset.color}] mb-[37px] rounded-[7px]">

        </div>
        <div class="absolute bottom-[75px] left-[100px] text-white text-[27px] font-normal font-sans">
            {selectedAsset.title}
        </div>
    </div>
    <ScrollingRows />
</div>