import { useEffect, useState } from "react"
import { SingleCanvas } from "./SingleCanvas"

import { Point, Box, Page } from "./CanvasInterfaces"
import { PdfPageNav, PdfPageNavProps } from "./PdfPageNav"
import { useLocation } from "react-router-dom"

export const CanvasCarousel: React.FC = () => {
    const BUCKET_BASE_URL = import.meta.env.VITE_BUCKET_BASE_URL

    const [loaded, setLoaded] = useState(true)
    const [selectedPageNum, setSelectedPageNum] = useState(0)

    // CONSTRUCT allPAGES
    // using navigate from react rotuer requires that i pass props to the location. so i extract the image urls from location.state
    const location = useLocation()
    const { imageURLS } = location.state

    // build pages array by constructing a page element for each image url
    const builtPages = imageURLS.map( (url: string, index: number) => {
        const page: Page = {
            pageNum: index,
            imageURL: `${BUCKET_BASE_URL}${url}`,
            boxes: []
        }
        return page
    })

    const [allPages, setAllPages] = useState<Page[]>(builtPages)

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