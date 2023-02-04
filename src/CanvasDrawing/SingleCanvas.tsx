import { Point, Box, Page } from "./CanvasInterfaces"

interface SingleCanvasProps {
    page: Page
}

export const SingleCanvas: React.FC<SingleCanvasProps> = ({page}) => {
    return(
        <div id="canvas">
            <canvas 
                className="bg-contain border border-black w-[510px] h-[660px]"
                style={{ backgroundImage: `url(${page.imageURL})` }} 
            />
        </div>
    )
}