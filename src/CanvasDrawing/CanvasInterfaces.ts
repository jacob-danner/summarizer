interface Point {
    x: number,
    y: number
}

interface Box {
    x: number,
    y: number,
    w: number,
    h: number
}

interface Page {
    pageNum: number,
    imageURL: string,
    boxes: Box[]
}

export type { Point, Box, Page}

