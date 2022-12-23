<script>
    import shuffle from 'lodash/shuffle';

    let rows = shuffle(
        [
            {
                title: 'Recommended'
            },
            {
                title: 'Movies'
            },
            {
                title: 'Series'
            },
            {
                title: 'TV Channels'
            },
            {
                title: 'Sport'
            }
        ]
    );
    let assets = 
    [
        {
            title: 'Asset 1',
            color: '#714ADD'
        },
        {
            title: 'Asset 2',
            color: '#AB8DFF'
        },
        {
            title: 'Asset 3',
            color: '#512EB0'
        },
        {
            title: 'Asset 4',
            color: '#714ADD'
        },
        {
            title: 'Asset 5',
            color: '#AB8DFF'
        },
        {
            title: 'Asset 6',
            color: '#512EB0'
        },
        {
            title: 'Asset 7',
            color: '#714ADD'
        },
        {
            title: 'Asset 8',
            color: '#AB8DFF'
        },
        {
            title: 'Asset 9',
            color: '#512EB0'
        }
    ];

    let focused = false;
</script>

<div class="overflow-y-auto overflow-x-hidden flex-shrink flex-grow">
    {#each rows as row}
        <div class="mb-[37px]">
            <div class="text-white mb-[22px] text-[27px] font-bold font-sans pl-[60px]">
                {row.title}
            </div>
            <div class="overflow-x-auto overflow-y-hidden flex-shrink flex-grow pl-[60px]">
                <div class="flex flex-row">
                    {#each assets as asset}
                        <div class="mr-[22px] flex flex-col">
                            <div class="w-[225px] h-[127px] bg-[{asset.color}] border-white border-solid border-[{focused ? '6px' : 0}] box-border rounded-[7px]">
                                {asset.color}
                            </div>
                            <div class="text-white mt-[10px] font-sans text-[24px] font-normal">
                                {asset.title}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
	{/each}
</div>