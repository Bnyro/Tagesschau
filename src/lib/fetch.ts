export default async function fetchJson(url: string) {
    let response = await fetch(url);
    return await response.json();
}