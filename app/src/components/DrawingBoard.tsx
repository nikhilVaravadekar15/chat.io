/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
    ClipboardX,
    Eraser,
    Redo2,
    Undo2
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TParticipant, TRoomContext } from '@/types';
import { useSocket } from '@/components/providers/SocketContextProvider';
import { RoomContext } from '@/components/providers/RoomContextProvider';
import { CanvasPath, ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";


export function ViewingBoard({ drawings }: {
    drawings: CanvasPath[]
}) {

    const sketchCanvas = React.useRef<ReactSketchCanvasRef>(null)
    sketchCanvas.current?.loadPaths(drawings)
    return (
        <div className="relative h-full w-full border overflow-y-scroll">
            <ReactSketchCanvas
                style={{
                    pointerEvents: "none"
                }}
            />
        </div>
    )
}

export default function DrawingBoard({ user }: {
    user: TParticipant
}) {

    const socket = useSocket()
    const [eraseMode, setEraseMode] = React.useState<boolean>(false);
    const [strokeWidth, setStrokeWidth] = React.useState<number>(4);
    const [eraserWidth, setEraserWidth] = React.useState<number>(4);
    const [strokeColor, setstrokeColor] = React.useState<string>("#000");
    const [backgroundColor, setBackgroundColor] = React.useState<string>("#fff");

    const [canvas, setCanvas] = React.useState<CanvasPath[]>([]);
    const sketchCanvas = React.useRef<ReactSketchCanvasRef>(null)
    const { roomDetails, setRoomDetails } = React.useContext<TRoomContext>(RoomContext)

    React.useEffect(() => {

        socket?.emit("room:user:start-drawing", {
            roomid: roomDetails.id,
            user: user,
            canvas: canvas
        });

        return () => {
            socket?.off("room:user:start-drawing");
        };

    }, [canvas])


    return (
        <div className="relative h-full w-full border overflow-y-scroll">
            <ReactSketchCanvas
                ref={sketchCanvas}
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
                eraserWidth={eraserWidth}
                canvasColor={backgroundColor}
                className={eraseMode ? "cursor-alias" : "cursor-crosshair"}
                onChange={(updatedPaths: CanvasPath[]) => {
                    setCanvas(updatedPaths);
                }}
                style={{
                    pointerEvents: "auto"
                }}
            />
            <div className="absolute p-2 w-full h-16 left-0 bottom-0 flex gap-2 items-center justify-center bg-[#020817] border">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={"secondary"}
                                className="rounded-full"
                                onClick={() => {
                                    sketchCanvas.current?.undo()
                                }}
                            >
                                <Undo2 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Undo</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={"secondary"}
                                className="rounded-full"
                                onClick={() => {
                                    sketchCanvas.current?.redo()
                                }}
                            >
                                <Redo2 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Redo</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={eraseMode ? "destructive" : "secondary"}
                                className={"rounded-full"}
                                onClick={() => {
                                    setEraseMode((erase: boolean) => {
                                        sketchCanvas.current?.eraseMode(!erase)
                                        return !erase;
                                    })
                                }}
                            >
                                <Eraser />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Eraser</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        {
                            eraseMode ? (
                                <>
                                    <TooltipTrigger asChild>
                                        <Input
                                            min={1}
                                            max={99}
                                            type={"number"}
                                            value={eraserWidth}
                                            onChange={(event: any) => {
                                                let value: number = event.target.value;
                                                setEraserWidth((stroke: number) => {
                                                    return value <= 0
                                                        ? stroke
                                                        : value > 99 ? 99 : value
                                                })
                                            }}
                                            className="w-20 bg-slate-800"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="p-1">Eraser-width</p>
                                    </TooltipContent>
                                </>
                            ) : (<>
                                <TooltipTrigger asChild>
                                    <Input
                                        min={1}
                                        max={99}
                                        type={"number"}
                                        value={strokeWidth}
                                        onChange={(event: any) => {
                                            let value: number = event.target.value;
                                            setStrokeWidth((stroke: number) => {
                                                return value <= 0
                                                    ? stroke
                                                    : value > 99 ? 99 : value
                                            })
                                        }}
                                        className="w-20 bg-slate-800"
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="p-1">Stroke-width</p>
                                </TooltipContent>
                            </>)
                        }
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Input
                                type={"color"}
                                value={strokeColor}
                                className="w-16 bg-slate-800"
                                onChange={(event: any) => {
                                    let color: string = event.target.value;
                                    setstrokeColor(color)
                                }}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Stroke-color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Input
                                type={"color"}
                                value={backgroundColor}
                                className="w-16 bg-slate-800"
                                onChange={(event: any) => {
                                    let color: string = event.target.value;
                                    setBackgroundColor(color)
                                }}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Background-color</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={"secondary"}
                                className="rounded-full"
                                onClick={() => {
                                    sketchCanvas.current?.clearCanvas()
                                }}
                            >
                                <ClipboardX />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-1">Clear</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
