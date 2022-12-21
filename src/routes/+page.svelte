<svelte:head>
    <title>News - Tagesschau</title>
</svelte:head>

<section id="news">
    {#each news as article}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <article on:click={() => article.isFocussed = true}>
            <img src={article.teaserImage?.klein1x1?.imageurl} alt={article.title}>
            <div>
                <h6>{article.topline ?? ""}</h6>
                <h3>{article.title}</h3>
                <p>{article.firstSentence ?? ""}</p>
            </div>
        </article>
        {#if article.isFocussed}
        <Details url={article.details} onDestroy={() => article.isFocussed = false} />
        {/if}
    {/each}
</section>

<script lang="ts">
	import fetchJson from "../lib/fetch";
	import { onMount } from "svelte";
    import Details from "../components/Details.svelte";

    let news: any[] = [];

    const fetchNews = async () => {
        const response = await fetchJson("https://www.tagesschau.de/api2/news/");
        news = response.news.filter((article: any) => article.type == "story");
    }

    onMount(() => {
        fetchNews();
    })
</script>

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
    }

    #news article div * {
        margin: 0.5rem 0;
    }
</style>