<script lang="ts">
	import fetchJson from '../lib/fetch';
	import { onMount } from 'svelte';
	import Details from '../components/Details.svelte';
	import formatDate from '$lib/format';

	let news: any[] = [];
	let nextPage: string | null = null;

	const fetchNews = async () => {
		const response = await fetchJson('https://www.tagesschau.de/api2u/news');
		news = response.news.filter((article: any) => article.type == 'story');
		nextPage = response.nextPage;
	};

	const fetchNextPage = async () => {
		if (!nextPage) return;
		const response = await fetchJson(nextPage);
		const newNews = response.news.filter((article: any) => article.type == 'story');
		news = news.concat(newNews);
		nextPage = response.nextPage;
	};

	const createScrollListener = () => {
		document.addEventListener('scroll', () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				fetchNextPage();
			}
		});
	};

	onMount(() => {
		fetchNews();
		createScrollListener();
	});
</script>

<svelte:head>
	<title>News - Tagesschau</title>
</svelte:head>

<section id="news">
	{#each news as article}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<article on:click={() => (article.isFocussed = true)}>
			<img src={article.teaserImage?.imageVariants['1x1-144']} alt={article.title} />
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
	{/each}
</section>

<style>
	#news {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		max-width: 100%;
	}

	#news article {
		margin: 0.5rem auto;
		width: 70%;
		border-radius: 1.2rem;
		padding: 1rem 2rem;
		cursor: pointer;
		background-color: var(--highlight);
		display: flex;
		align-items: center;
	}

	#news article img {
		margin-right: 1.5rem;
		border-radius: 1rem;
		height: 7.5rem;
		width: auto;
	}

	#news article div {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	#news article div * {
		margin: 0.1rem 0;
	}

	#news article div p {
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
		#news article {
			width: 90%;
			flex-direction: column;
		}

		.topline {
			display: none;
		}

		article div {
			padding-top: 1.5rem;
		}
	}
</style>
