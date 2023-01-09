<script>
	import GroupItem from "./GroupItem.svelte";

    export let rows = [];
</script>

<div id="show-home-content" class="overflow-y-auto overflow-x-hidden flex-shrink flex-grow">
    {#each rows as row}
        <div 

            style="margin-bottom: 37px"
        >
            <div class="text-white mb-[22px] text-[27px] font-bold font-sans pl-[60px]">
                {row.title}
            </div>
            <div id={row.uid} class="overflow-x-auto overflow-y-hidden flex-shrink flex-grow pl-[60px]">
                <div class="flex flex-row">
                    {#each row.list as asset}
                        <GroupItem
                            uid={asset.uid}
                            color={asset.color}
                            title={asset.title}
                            focusPosition={asset.focusPosition}
                        />
                    {/each}
                </div>
            </div>
        </div>
	{/each}
</div>