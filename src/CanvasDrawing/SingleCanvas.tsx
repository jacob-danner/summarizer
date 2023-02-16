import { useRef, useState, useEffect } from "react"

import { Point, Box, Page } from "./CanvasInterfaces"
import { PdfPageNav, PdfPageNavProps } from "./PdfPageNav"

interface SingleCanvasProps {
    page: Page,
    literalPageNavProps: PdfPageNavProps
}

export const SingleCanvas: React.FC<SingleCanvasProps> = ({page, literalPageNavProps}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const [anchorPoint, setAnchorPoint] = useState<Point | null>(null)
    const [curPoint, setCurPoint] = useState<Point | null>(null)
    const [rectangles, setRectangles] = useState<Box[]>(page.boxes)

    useEffect(() => {
        // initialize the canvas on mount
        if (canvasRef.current) {

            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (context) {
                canvas.width = 510
                canvas.height = 650
                context.strokeStyle = '#404040'
                context.lineWidth = 2
                contextRef.current = context
            }
        }
    }, [])    

    useEffect(() => {
        // if page changes
        if (canvasRef.current) {
            contextRef.current!.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            setRectangles(page.boxes)
        }
    }, [page])

    useEffect(() => {
        // on rectangles change, draw accordingly
        drawRectangles()
    }, [rectangles])
  

    const startDrawing = ({nativeEvent}: React.MouseEvent) => {
        // on mouse down -> store info about where drawing started
        setIsDrawing(true)
        const {offsetX, offsetY} = nativeEvent
        const anchorPoint = {x: offsetX, y: offsetY}
        setAnchorPoint(anchorPoint)
        setCurPoint(anchorPoint)
    }

    const draw = ({nativeEvent}: React.MouseEvent) => {
        // on mouse move -> update curPoint and call to draw as the mouse moves
        if ( !isDrawing ) return 
        // else update curPoint as mouse moves
        const {offsetX, offsetY} = nativeEvent
        const cur = {x: offsetX, y: offsetY}
        setCurPoint(cur)
        drawRectangleOnMove(anchorPoint!, curPoint!)
    }

    function getDimensions(p1: Point, p2: Point) {
        const w = p2.x - p1.x 
        const h = p2.y - p1.y
        return {w, h}
    }

    function drawRectangleOnMove(p1: Point, p2: Point) {
        // this draws as the mouse moves. doesn't handle saving rectangles
        if (contextRef.current) {
            const {w, h} = getDimensions(p1, p2)
            const inProgressRect: Box = {x: p1.x, y: p1.y, w: w, h: h}
            const {x, y} = inProgressRect
            // draw the saved rectangles 
            drawRectangles()
            // draw the current, unsaved rectangle
            contextRef.current!.strokeRect(x, y, w, h)
        }
    }

    function drawRectangles() {
        // draw each saved rectangle to the canvas
        if (contextRef.current && canvasRef.current) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            rectangles.forEach((rect: Box) => {
                const {x, y, w, h} = rect
                contextRef.current!.strokeRect(x, y, w, h)
            })
        }
    }

    function saveRectangle(p1: Point, p2: Point) {
        const {w, h} = getDimensions(p1, p2)
        const rect: Box ={
            x: p1.x,
            y: p1.y,
            w: w,
            h: h
        }
        // i had a bug with setRectangles not being fast enough to set page.boxes correctly. wouldn't save to object
        const saved = [...rectangles, rect]
        setRectangles(saved)
        page.boxes = saved
        console.log(page)
    }

    const finishDrawing = ({nativeEvent}: React.MouseEvent) => {
        // on mouse up -> save current rectangle
        saveRectangle(anchorPoint!, curPoint!)
        setIsDrawing(false)
    }

    function undo() {
        // remove last drawn rectangle
        rectangles.pop()
        setRectangles(rectangles)
        console.log(rectangles)
        drawRectangles()
    }

    return(
        <div id="canvas-and-nav">
            <canvas 
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                className="bg-contain border w-[510px] h-[660px] shadow-2xl rounded-sm"
                style={{ backgroundImage: `url(${page.imageURL})`, cursor: 'crosshair' }} 
            />
            
            <PdfPageNav {...literalPageNavProps} />

            <div id="button-container" className="flex justify-between mt-2">
                <button 
                    className="w-1/4 px-4 py-2 bg-red-700 text-white font-sm leading-tight uppercase rounded shadow-md hover:bg-red-800"
                    onClick={undo}
                >undo</button>

                <button 
                    className="w-1/4 px-4 py-2 bg-blue-600 text-white font-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700"
                    // onClick={undo}
                    // todo
                >submit</button>
            </div>
        </div>
    )
}