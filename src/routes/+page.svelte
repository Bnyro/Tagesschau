<script lang="ts">
	import fetchJson from '../lib/fetch';
	import { onMount } from 'svelte';
	import Article from '../components/Article.svelte';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';

	let news: any[] = [];
	let homepage: any[] = [];
	let regional: any[] = [];
	let nextPage: string | null = null;

	const ressorts = ['alle', 'inland', 'ausland', 'wirtschaft', 'sport', 'investigativ']; // 'video' ressort not yet supported
	const regions = [
		'Alle',
		'Baden-Württemberg',
		'Bayern',
		'Berlin',
		'Brandenburg',
		'Bremen',
		'Hamburg',
		'Hessen',
		'Mecklenburg-Vorpommern',
		'Niedersachsen',
		'Nordrhein-Westfalen',
		'Rheinland-Pfalz',
		'Saarland',
		'Sachsen',
		'Sachsen-Anhalt',
		'Schleswig-Holstein',
		'Thüringen'
	];

	const filterArticles = (articles: any[]) => {
		return articles.filter((article) => article.type == 'story');
	};

	const fetchHomePage = async () => {
		const response = await fetchJson('https://www.tagesschau.de/api2u/homepage');
		homepage = filterArticles(response.news);
		regional = filterArticles(response.regional);
	};

	const fetchNews = async (regions: string | null, ressort: string | null) => {
		let params: any = {};
		if (regions) params['regions'] = regions;
		if (ressort) params['ressort'] = ressort;
		const response = await fetchJson('https://www.tagesschau.de/api2u/news', params);
		news = filterArticles(response.news);
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

	const refreshPage = async () => {
		homepage = [];
		regional = [];
		news = [];
		const regions = $page.url.searchParams.get('regions');
		const ressort = $page.url.searchParams.get('ressort');
		if (!regions && !ressort) await fetchHomePage();
		fetchNews(regions, ressort);
	};

	onMount(() => {
		refreshPage();
		createScrollListener();
	});

	const refreshWithNewParams = (key: string, value: any | null) => {
		const params = $page.url.searchParams;
		if (value) params.set(key, value);
		else params.delete(key);
		goto('./?' + params);
		refreshPage();
	};

	const onRessortClick = (ressort: string) => {
		refreshWithNewParams('ressort', ressort != 'alle' ? ressort : null);
	};

	const onRegionClick = (region: string) => {
		const regionIndex = regions.indexOf(region);
		refreshWithNewParams('regions', regionIndex != 0 ? regionIndex : null);
	};
</script>

<svelte:head>
	<title>News - Tagesschau</title>
</svelte:head>

<section id="news">
	<div id="ressorts">
		{#each ressorts as ressort}
			<button on:click={() => onRessortClick(ressort)}>{ressort}</button>
		{/each}
	</div>
	<div id="regions">
		{#each regions as region}
			<button on:click={() => onRegionClick(region)}>{region}</button>
		{/each}
	</div>
	{#if homepage.length}
		<h1>Homepage</h1>
		{#each homepage as article}
			<Article {article} />
		{/each}
	{/if}
	{#if regional.length}
		<h1>Regional</h1>
		{#each regional as article}
			<Article {article} />
		{/each}
	{/if}
	<h1>News</h1>
	{#each news as article}
		<Article {article} />
	{/each}
</section>

<style>
	#news {
		display: flex;
		flex-direction: column;
		width: 100vw;
		max-width: 70%;
		margin: 0 auto;
	}

	h1 {
		margin-top: 3rem;
		margin-left: 0.5rem;
	}

	#regions {
		margin-top: 1rem;
	}

	#ressorts button,
	#regions button {
		margin: 0.4rem;
		padding: 0.5rem 0.7rem;
		border-radius: 0.5rem;
		outline: none;
		border: none;
		text-transform: capitalize;
		background: var(--accent);
		color: var(--bg);
		cursor: pointer;
	}
</style>
