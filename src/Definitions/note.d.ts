interface Manim {
    pos: [number, number],
    dim: [number, number],
    img: string
}

interface Note {
    _id: string,
    title: string,
    author: string,
    img: string,
    dim: [number, number], //width, height in pixels
    course: string,
    score: number,
    children: string[]
}
