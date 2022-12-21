<div id="details">
{#if details}
    <img style="display: none;" src="" alt="">
    <button id="x" on:click={onDestroy}>X</button>
    <h1>{details.title}</h1>
    <div id="content">{@html content}</div>
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
    let content: string;

    const fetchDetails = async () => {
        details = await fetchJson(url);
        content = generateContentHtml(details.content);
    }

    const generateContentHtml = (content: any) => {
        let html: string[] = [];
        for (var i = 0; i < content.length; i++) {
            const part = content[i];
            if (part.type == "text" || part.type == "headline") {
                html.push(part.value);
            } else if (part.type == "box" && part.box.images != undefined) {
                const box = part.box;
                console.log("has img");
                html.push(
                    `
                    <img src="${box.images.videowebl.imageurl ?? ''}" alt="${box.images.alttext ?? ''}" style="margin: 2rem 0; border-radius: 1rem;">
                    <figcaption>${box.title ?? ""}</figcaption>
                    `
                )
            } else if (part.type == "video") {
                html.push(
                    `
                    <video controls style="margin: 2rem 0; border-radius: 1rem;">
                        <source src="${part.video.streams.h264m}">    
                    </video>
                    `
                )
            }
        }
        return html.join("");
    }

    onMount(() => {
        fetchDetails();
    })
</script>

<style>
    h1 {
        margin-top: 3rem;
    }

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

    #content {
        margin: 0 auto;
        width: 80%;
        padding: 2rem;
        text-align: center;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>