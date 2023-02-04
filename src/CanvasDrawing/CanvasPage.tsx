import { CanvasCarousel } from "./CanvasCarousel"

export const CanvasPage = () => {
    return (
        <div id="canvas-page" className="bg-neutral-200 h-full flex justify-center items-center">
            <div id="canvas-card" className="bg-white rounded-lg shadow-lg w-1/3 h-5/6 flex justify-center items-center">
                <CanvasCarousel />
            </div>
        </div>
    )
}