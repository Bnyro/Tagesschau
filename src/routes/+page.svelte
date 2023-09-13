<script lang="ts">
	import fetchJson from '../lib/fetch';
	import { onMount } from 'svelte';
	import Article from '../components/Article.svelte';

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
		<Article {article} />
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
</style>
