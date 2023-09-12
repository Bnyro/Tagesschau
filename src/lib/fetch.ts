export default async function fetchJson(url: string) {
	const response = await fetch(url);
	return await response.json();
}
