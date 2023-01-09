<script>
    import { onMount } from 'svelte';
    import Content from '$components/content/Content.svelte';
    import Menu from '$components/app-bar/Menu.svelte';

    let hasFocusedChild = false;
    let focused = false;
    let color = '';

    onMount( () => {
		
	});

</script>

<div class="bg-[#221c35] w-[90%] h-screen flex flex-row">
    <Content />
</div>