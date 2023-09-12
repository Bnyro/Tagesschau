export default function generateContentHtml(content: any) {
	const html: string[] = [];
	for (let i = 0; i < content.length; i++) {
		const part = content[i];
		if (part.type == 'text' || part.type == 'headline') {
			html.push(part.value);
		} else if (part.type == 'box' && part.box.images != undefined) {
			html.push(
				`
                <img src="${part.box.images.videowebl.imageurl ?? ''}" alt="${
					part.box.images.alttext ?? ''
				}">
                <figcaption>${part.box.title ?? ''}</figcaption>
                `
			);
		} else if (part.type == 'video') {
			html.push(
				`
                <video controls>
                    <source src="${part.video.streams.h264m ?? part.video.streams.h264xl}">    
                </video>
                `
			);
		} else if (part.type == 'htmlEmbed') {
			html.push(`<embed src="${part.htmlEmbed.url}">`);
		}
	}
	return html.join('');
}
