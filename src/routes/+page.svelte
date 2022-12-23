<script>
    import { onMount } from 'svelte';
    import Content from '$components/Content.svelte';
    import Menu from '$components/Menu.svelte';

    let hasFocusedChild = false;
    let focused = false;
    let color = '';

    onMount( () => {
		
	});

</script>

<div class="bg-[#221c35] w-[1440px] h-[810px] flex flex-row">
    <Menu 
        hasFocusedChild={hasFocusedChild}
        focused={focused}
    />
    <Content />
</div>