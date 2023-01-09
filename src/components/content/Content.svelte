<script>
    import { onMount } from "svelte";
    import { attachFocus } from "./attachFocus";
	import ScrollingRows from "./ScrollingRows.svelte";
    import { asset } from "$stores/asset";

    let rows =
        [
            {
                uid: 'Recommended',
                title: 'Recommended',
                list: [
                    {
                        title: 'Asset 1',
                        color: '#714ADD',
                        uid: 'Asset-1-Recommended',
                    },
                    {
                        title: 'Asset 2',
                        color: '#AB8DFF',
                        uid: 'Asset-2-Recommended',
                    },
                    {
                        title: 'Asset 3',
                        color: '#512EB0',
                        uid: 'Asset-3-Recommended',
                    },
                    {
                        title: 'Asset 4',
                        color: '#714ADD',
                        uid: 'Asset-4-Recommended',
                    },
                    {
                        title: 'Asset 5',
                        color: '#AB8DFF',
                        uid: 'Asset-5-Recommended',
                    },
                    {
                        title: 'Asset 6',
                        color: '#512EB0',
                        uid: 'Asset-6-Recommended',
                    },
                    {
                        title: 'Asset 7',
                        color: '#714ADD',
                        uid: 'Asset-7-Recommended',
                    },
                    {
                        title: 'Asset 8',
                        color: '#AB8DFF',
                        uid: 'Asset-8-Recommended',
                    },
                    {
                        title: 'Asset 9',
                        color: '#512EB0',
                        uid: 'Asset-9-Recommended',
                    }
                ]
            },
            {
                uid: 'Movies',
                title: 'Movies',
                list: [
                    {
                        title: 'Asset 1',
                        color: '#714ADD',
                        uid: 'Asset-1-Movies',
                    },
                    {
                        title: 'Asset 2',
                        color: '#AB8DFF',
                        uid: 'Asset-2-Movies',
                    },
                    {
                        title: 'Asset 3',
                        color: '#512EB0',
                        uid: 'Asset-3-Movies',
                    },
                    {
                        title: 'Asset 4',
                        color: '#714ADD',
                        uid: 'Asset-4-Movies',
                    },
                    {
                        title: 'Asset 5',
                        color: '#AB8DFF',
                        uid: 'Asset-5-Movies',
                    },
                    {
                        title: 'Asset 6',
                        color: '#512EB0',
                        uid: 'Asset-6-Movies',
                    },
                    {
                        title: 'Asset 7',
                        color: '#714ADD',
                        uid: 'Asset-7-Movies',
                    },
                    {
                        title: 'Asset 8',
                        color: '#AB8DFF',
                        uid: 'Asset-8-Movies',
                    },
                    {
                        title: 'Asset 9',
                        color: '#512EB0',
                        uid: 'Asset-9-Movies',
                    }
                ]
            },
            {
                uid: 'Series',
                title: 'Series',
                list: [
                    {
                        title: 'Asset 1',
                        color: '#714ADD',
                        uid: 'Asset-1-Series',
                    },
                    {
                        title: 'Asset 2',
                        color: '#AB8DFF',
                        uid: 'Asset-2-Series',
                    },
                    {
                        title: 'Asset 3',
                        color: '#512EB0',
                        uid: 'Asset-3-Series',
                    },
                    {
                        title: 'Asset 4',
                        color: '#714ADD',
                        uid: 'Asset-4-Series',
                    },
                    {
                        title: 'Asset 5',
                        color: '#AB8DFF',
                        uid: 'Asset-5-Series',
                    },
                    {
                        title: 'Asset 6',
                        color: '#512EB0',
                        uid: 'Asset-6-Series',
                    },
                    {
                        title: 'Asset 7',
                        color: '#714ADD',
                        uid: 'Asset-7-Series',
                    },
                    {
                        title: 'Asset 8',
                        color: '#AB8DFF',
                        uid: 'Asset-8-Series',
                    },
                    {
                        title: 'Asset 9',
                        color: '#512EB0',
                        uid: 'Asset-9-Series',
                    }
                ]
            },
            {
                uid: 'TV-Channels',
                title: 'TV Channels',
                list: [
                    {
                        title: 'Asset 1',
                        color: '#714ADD',
                        uid: 'Asset-1-TV-Channels',
                    },
                    {
                        title: 'Asset 2',
                        color: '#AB8DFF',
                        uid: 'Asset-2-TV-Channels',
                    },
                    {
                        title: 'Asset 3',
                        color: '#512EB0',
                        uid: 'Asset-3-TV-Channels',
                    },
                    {
                        title: 'Asset 4',
                        color: '#714ADD',
                        uid: 'Asset-4-TV-Channels',
                    },
                    {
                        title: 'Asset 5',
                        color: '#AB8DFF',
                        uid: 'Asset-5-TV-Channels',
                    },
                    {
                        title: 'Asset 6',
                        color: '#512EB0',
                        uid: 'Asset-6-TV-Channels',
                    },
                    {
                        title: 'Asset 7',
                        color: '#714ADD',
                        uid: 'Asset-7-TV-Channels',
                    },
                    {
                        title: 'Asset 8',
                        color: '#AB8DFF',
                        uid: 'Asset-8-TV-Channels',
                    },
                    {
                        title: 'Asset 9',
                        color: '#512EB0',
                        uid: 'Asset-9-TV-Channels',
                    }
                ]
            },
            {
                uid: 'Sports',
                title: 'Sports',
                list: [
                    {
                        title: 'Asset 1',
                        color: '#714ADD',
                        uid: 'Asset-1-Sports',
                    },
                    {
                        title: 'Asset 2',
                        color: '#AB8DFF',
                        uid: 'Asset-2-Sports',
                    },
                    {
                        title: 'Asset 3',
                        color: '#512EB0',
                        uid: 'Asset-3-Sports',
                    },
                    {
                        title: 'Asset 4',
                        color: '#714ADD',
                        uid: 'Asset-4-Sports',
                    },
                    {
                        title: 'Asset 5',
                        color: '#AB8DFF',
                        uid: 'Asset-5-Sports',
                    },
                    {
                        title: 'Asset 6',
                        color: '#512EB0',
                        uid: 'Asset-6-Sports',
                    },
                    {
                        title: 'Asset 7',
                        color: '#714ADD',
                        uid: 'Asset-7-Sports',
                    },
                    {
                        title: 'Asset 8',
                        color: '#AB8DFF',
                        uid: 'Asset-8-Sports',
                    },
                    {
                        title: 'Asset 9',
                        color: '#512EB0',
                        uid: 'Asset-9-Sports',
                    }
                ]
            }
        ]
    ;

    let convertedRows = [];

    onMount(async () => {
        convertedRows = attachFocus(rows);
        console.log(convertedRows);
    });

</script>

<div class="flex-1 overflow-hidden flex flex-col">
    <div class="text-white text-[48px] font-semibold font-sans text-center mt-[52px] mb-[37px]">
        Norigin Spatial Navigation
    </div>
    <div id="selected-content" class="relative flex flex-col items-center">
        <div 
            class="h-[282px] w-[1074px] mb-[37px] rounded-[7px]"
            style={`background-color:${$asset.color}`}
        >
        </div>
        <div class="absolute bottom-[75px] left-[100px] text-white text-[27px] font-normal font-sans">
            {$asset.title}
        </div>
    </div>
    <ScrollingRows rows={convertedRows}/>
</div>