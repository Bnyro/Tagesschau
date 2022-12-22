<div id="details">
{#if details}
    <img style="display: none;" src="" alt="">
    <button id="x" on:click={onDestroy}>X</button>
    <article>
        <h1>{details.title}</h1>
        <div id="content">{@html content}</div>
    </article>
{:else}
    <Spinner />
{/if}
</div>

<script lang="ts">
	import fetchJson from "../lib/fetch";
	import { onMount } from "svelte";
    import Spinner from "./Spinner.svelte"
	import generateContentHtml from "$lib/parser";

    export let url: string;
    export let onDestroy: () => void;

    let details: any = null;
    let content: string;

    const fetchDetails = async () => {
        details = await fetchJson(url);
        content = generateContentHtml(details.content);
    }

    onMount(() => {
        fetchDetails();
    })
</script>

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
        align-items: center;
        background: var(--bg);
    }

    #x {
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

    #x:hover {
        opacity: 0.7;
    }

    article {
        margin: 0 auto;
        width: 80%;
        padding: 2rem;
        text-align: center;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>