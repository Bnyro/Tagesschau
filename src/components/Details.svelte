<script lang="ts">
	import fetchJson from '../lib/fetch';
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';
	import generateContentHtml from '$lib/parser';

	export let url: string;
	export let onDestroy: () => void;

	let details: any = null;
	let content: string;

	const fetchDetails = async () => {
		// details = await fetchJson(url);
		content = generateContentHtml(details.content);
	};

	onMount(() => {
		fetchDetails();
	});
</script>

<div id="details">
	{#if details}
		<img style="display: none;" src="" alt="" />
		<button id="destroy" on:click={onDestroy}>X</button>
		<article>
			<h1>{details.title}</h1>
			<div id="content">{@html content}</div>
		</article>
	{:else}
		<div id="spinner-container">
			<Spinner />
		</div>
	{/if}
</div>

<style>
	#details {
		position: fixed;
		height: 100vh;
		width: 100vw;
		max-width: 100%;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: var(--bg);
		z-index: 100;
	}

	#destroy {
		border-radius: 50%;
		background: var(--highlight);
		color: var(--text);
		width: 2rem;
		height: 2rem;
		position: absolute;
		right: 0;
		top: 0;
		margin: 2rem;
		cursor: pointer;
		transition: all ease-in-out 0.2s;
	}

	#destroy:hover {
		opacity: 0.7;
	}

	article {
		padding: 2rem calc(10vw + 2rem);
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
	}

	:global(article img),
	:global(article video),
	:global(article embed) {
		border-radius: 1rem;
		max-width: 95%;
		height: auto;
		margin: 1rem 0;
	}

	#spinner-container {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 800px) {
		article {
			padding: 2rem 1rem;
		}
	}
</style>
