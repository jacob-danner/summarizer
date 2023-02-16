import { CanvasCarousel } from "./CanvasCarousel"

export const CanvasPage = () => {
    return (
        <div id="canvas-page" className="bg-neutral-200 h-full flex justify-center items-center pt-8">
            <div id="canvas-card" className="bg-white rounded-lg shadow-lg w-1/2 h-[90%] min-h-[650px] flex justify-center items-center">
                <CanvasCarousel />
            </div>
        </div>
    )
}