export default function generateContentHtml(content: any) {
    let html: string[] = [];
    for (var i = 0; i < content.length; i++) {
        const part = content[i];
        if (part.type == "text" || part.type == "headline") {
            html.push(part.value);
        } else if (part.type == "box" && part.box.images != undefined) {
            const box = part.box;
            html.push(
                `
                <img src="${box.images.videowebl.imageurl ?? ''}" alt="${box.images.alttext ?? ''}" style="margin: 2rem 0; border-radius: 1rem; max-width: 90%;">
                <figcaption>${box.title ?? ""}</figcaption>
                `
            )
        } else if (part.type == "video") {
            html.push(
                `
                <video controls style="margin: 2rem 0; border-radius: 1rem;">
                    <source src="${part.video.streams.h264m ?? part.video.streams.h264xl}">    
                </video>
                `
            )
        }
    }
    return html.join("");
}