import forwardArrow from '../assets/forward-arrow.png'
import backArrow from '../assets/back-arrow.png'


export interface PdfPageNavProps {
    selectedPageNum: number,
    setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>
    allPagesLength: number
}



export const PdfPageNav: React.FC<PdfPageNavProps> = ({selectedPageNum, setSelectedPageNum, allPagesLength}) => {

    // as a means of creating a range to make #allPagesLength components
    const rangedArray = Array.from({length: allPagesLength}, (x, i) => i)

    // Bullet component so styling will be applied if it the selected Bullet
    interface BulletProps {
        selected: boolean
    }
    const Bullet: React.FC<BulletProps> = ({selected}) => {
        return (
            <div className={`${selected ? "opacity-100" : "opacity-50"}`}>&bull;</div>
        )
    }

    function updateSelectedPageNum(direction: "left" | "right") {
        let change = (direction === "right") ? 1 : -1

        let newPageNum = selectedPageNum + change
        
        // if statements to handle overflow. these statements make it loop.
        if (newPageNum >= allPagesLength) newPageNum = 0
        if (newPageNum < 0) newPageNum = allPagesLength-1

        setSelectedPageNum(newPageNum)
    }

    return (
        <div id="carousel-nav" className="px-4 flex justify-between items-center">

            <button onClick={() => updateSelectedPageNum('left')}><img src={backArrow} /></button>

            <div id="bullets" className="flex justify-between w-1/6">
                {rangedArray.map((i) => {
                    return (
                        <Bullet selected={i === selectedPageNum} />
                    )
                })}
            </div>

            <button onClick={() => updateSelectedPageNum('right')}><img src={forwardArrow}/></button>
        </div>
    )
}