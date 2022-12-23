export default function formatDate(dateStr: any) {
	const date = new Date(dateStr);
	return date.toLocaleString();
}
