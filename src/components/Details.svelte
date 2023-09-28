<script lang="ts">
	import { onMount } from 'svelte';
	import generateContentHtml from '$lib/parser';

	export let onDestroy: () => void;
	export let details: any = null;

	let content: string;

	onMount(() => {
		content = generateContentHtml(details.content);
	});
</script>

<div id="details">
	<img style="display: none;" src="" alt="" />
	<button id="destroy" on:click={onDestroy}>X</button>
	<article>
		{#if details.teaserImage?.imageVariants}
			<img src={details.teaserImage.imageVariants['16x9-1920']} alt={details.teaserImage.alttext} />
		{/if}
		<h1>{details.title}</h1>
		<p id="date"><i>{new Date(details.date).toLocaleString()}</i></p>
		<div id="content">{@html content}</div>
	</article>
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

	#date {
		margin-top: 0.5rem;
		margin-bottom: 2rem;
	}

	#content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	:global(article img),
	:global(article video),
	:global(article embed) {
		border-radius: 1rem;
		max-width: 95%;
		width: 50rem;
		aspect-ratio: 16 / 9;
		height: auto;
		margin: 1rem 0;
		align-self: center;
	}

	@media only screen and (max-width: 800px) {
		article {
			padding: 2rem 1rem;
		}
	}
</style>
