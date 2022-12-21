<div id="details">
{#if details}
    <button id="x" on:click={onDestroy}>X</button>
    <h1>{details.title}</h1>
{:else}
    <Spinner />
{/if}
</div>

<script lang="ts">
	import fetchJson from "../lib/fetch";
	import { onMount } from "svelte";
    import Spinner from "./Spinner.svelte"

    export let url: string;
    export let onDestroy: () => void;

    let details: any = null;

    const fetchDetails = async () => {
        details = await fetchJson(url);
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
    }
</style>