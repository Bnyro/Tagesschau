<script lang="ts">
	import MediaQuery from '../components/MediaQuery.svelte';
	import formatDate from '$lib/format';
	import { goto } from '$app/navigation';

	export let article: any;

	const onArticleClick = () => {
		goto(new URL(article.detailsweb).pathname);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article on:click={onArticleClick}>
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
			<h5>{article.topline ?? ''}</h5>
			<span class="date">{formatDate(article.date)}</span>
		</span>
		<h3>{article.title}</h3>
		<p>{article.firstSentence ?? ''}</p>
	</div>
</article>

<style>
	article {
		margin: 0.5rem 0;
		width: 100%;
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
