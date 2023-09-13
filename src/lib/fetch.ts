export default async function fetchJson(url: string, params: any = {}) {
	if (Object.keys(params).length) {
		url += "?" + new URLSearchParams(params);
	}
	const response = await fetch(url);
	return await response.json();
}
