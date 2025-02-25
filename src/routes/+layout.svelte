<script lang="ts">
	import { page } from '$app/stores';
	import { recordStore } from '$lib/index';
	import '../app.css';
	let { children } = $props();

	$effect(() => {
		if ($page.url.pathname === '/') {
			recordStore.set(0);
		}
	});
</script>

{@render children()}
