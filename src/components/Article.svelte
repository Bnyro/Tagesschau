<script lang="ts">
	import MediaQuery from '../components/MediaQuery.svelte';
	import Details from '../components/Details.svelte';
	import formatDate from '$lib/format';

	export let article: any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article on:click={() => (article.isFocussed = true)}>
	<MediaQuery query="only screen and (max-width: 800px)" let:matches>
		{#if matches}
			<img
				src={article.teaserImage?.imageVariants['16x9-640']}
				alt={article.teaserImage?.alttext}
			/>
		{:else}
			<img src={article.teaserImage?.imageVariants['1x1-144']} alt={article.teaserImage?.alttext} />
		{/if}
	</MediaQuery>
	<div>
		<span class="topline">
			<h6>{article.topline ?? ''}</h6>
			<span class="date">{formatDate(article.date)}</span>
		</span>
		<h3>{article.title}</h3>
		<p>{article.firstSentence ?? ''}</p>
	</div>
</article>
{#if article.isFocussed}
	<Details url={article.details} onDestroy={() => (article.isFocussed = false)} />
{/if}

<style>
	article {
		margin: 0.5rem auto;
		width: 70%;
		border-radius: 1.2rem;
		padding: 1rem 2rem;
		cursor: pointer;
		background-color: var(--highlight);
		display: flex;
		align-items: center;
	}

	article img {
		margin-right: 1.5rem;
		border-radius: 1rem;
		height: 7.5rem;
		width: auto;
	}

	article div {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	article div * {
		margin: 0.1rem 0;
	}

	article div p {
		margin-top: 0.5rem;
	}

	.topline {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.date {
		opacity: 0.5;
	}

	@media only screen and (max-width: 800px) {
		article {
			width: 90%;
			flex-direction: column;
		}

		article .topline {
			display: none;
		}

		article img {
			max-width: 100%;
			height: auto;
		}

		article div {
			padding-top: 1.5rem;
		}
	}
</style>
