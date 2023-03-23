
export function parseSvg(svg: string): SVGElement {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    return doc.documentElement as unknown as SVGElement;
}


export function createNoiseElement(){
    const noise = document.createElement("div")
    //@ts-ignore
    noise.style = `
    background-image: url("paper.png");
    position: absolute;
    inset: 0;
    background-size: 120px;
    pointer-events: none;
    opacity: .012;
    z-index: 980;
    animation: fade-in 2s;
    `
    return noise
}