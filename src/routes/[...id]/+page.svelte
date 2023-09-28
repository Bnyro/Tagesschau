<script lang="ts">
	import { goto } from '$app/navigation';
	import fetchJson from '$lib/fetch';
	import Details from '../../components/Details.svelte';
	import { onMount } from 'svelte';
	import Spinner from '../../components/Spinner.svelte';

	let details: any | null = null;

	const fetchDetails = async () => {
		const url = 'https://www.tagesschau.de/api2u' + window.location.pathname;
		details = await fetchJson(url);
	};

	onMount(() => {
		fetchDetails();
	});

	const onDestroy = () => {
		goto('/');
	};
</script>

{#if details}
	<Details {details} {onDestroy} />
{:else}
	<div id="spinner-container">
		<Spinner />
	</div>
{/if}

<style>
	#spinner-container {
		height: 100%;
		width: 100%;
		min-height: 95vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
