import { useEffect, useState } from "react"
import { SingleCanvas } from "./SingleCanvas"

import { Point, Box, Page } from "./CanvasInterfaces"
import { PdfPageNav, PdfPageNavProps } from "./PdfPageNav"

export const CanvasCarousel: React.FC = () => {
    const [loaded, setLoaded] = useState(false)
    const [selectedPageNum, setSelectedPageNum] = useState(0)

    // set all pages, fake call to api to get images.
    const [allPages, setAllPages] = useState<Page[]>([])
    useEffect(() => {
        const p0: Page = {
            pageNum: 0,
            imageURL: 'https://holdmy-pdf-plz.s3.amazonaws.com/images/0.jpg',
            boxes: []
        }
        const p1: Page = {
            pageNum: 1,
            imageURL: 'https://holdmy-pdf-plz.s3.amazonaws.com/images/1.jpg',
            boxes: []
        }
        const p2: Page = {
            pageNum: 2,
            imageURL: 'https://holdmy-pdf-plz.s3.amazonaws.com/images/2.jpg',
            boxes: []
        }

        setAllPages([p0, p1, p2])
        setLoaded(true)
    }, [])


    const PdfPageNavProps: PdfPageNavProps = {
        selectedPageNum: selectedPageNum,
        setSelectedPageNum: setSelectedPageNum,
        allPagesLength: allPages.length
    }

    if (loaded) {
        return (
            <div id="carousel" className="h-full flex flex-col justify-center">
                <SingleCanvas page={allPages[selectedPageNum]} literalPageNavProps={PdfPageNavProps} />
            </div>
        )
    } else {
        return (
            <p>loading...</p>
        )
    }
}