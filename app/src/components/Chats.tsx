/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
    FileDown,
    FilePlus2,
    Laugh,
    Paperclip,
    Send,
    Upload
} from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Input } from "@/components/./ui/input"
import { TParticipant, TRoomContext } from '@/types'
import { RoomContext } from './providers/RoomContextProvider'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useSocket } from '@/components/providers/SocketContextProvider'
import { useDropzone } from 'react-dropzone'
import { useToast } from './ui/use-toast'


type Props = {
    user: TParticipant
}

type TMessage = {
    socketid: string,
    username: string,
    message: string,
    file?: {
        name: string,
        type: string,
        size: number,
        file: File
    }
    timestamp?: string
}

export default function Chats({ user }: Props) {

    const { toast } = useToast()
    const socket = useSocket()
    const [text, setText] = React.useState<string>('')
    const lastElementRef = React.useRef<HTMLDivElement>(null);
    const [emoji, setEmoji] = React.useState<boolean>(false)
    const [messages, setMessages] = React.useState<TMessage[]>([])
    const { roomDetails } = React.useContext<TRoomContext>(RoomContext)
    const [file, setFile] = React.useState<File | null>(null)

    const onFileDrop = React.useCallback(async (acceptedFiles: File[]) => {
        let file: File = acceptedFiles[0]
        console.log(file.size)
        if (file.size > (512 * 1024 * 1024)) {
            toast({
                variant: "destructive",
                title: "Unable to upload file",
                description: "File size cannnot greater than 512MB, please try again later.",
            })
        } else {
            setFile(file)
            setText("📁 " + file.name + "\n")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileDrop,
    })

    function handleOnEnter() {
        if (text.trim() === "") return
        socket?.emit("room:user:message", {
            roomid: roomDetails.id,
            msg: {
                socketid: user.socketid,
                username: user.username,
                message: text,
                file: file && {
                    name: file?.name,
                    type: file?.type,
                    size: file?.size,
                    file: file
                },
                timestamp: new Date().toLocaleString()
            } as TMessage
        })
        setFile(null)
        setText("")
    }

    React.useEffect(() => {
        if (lastElementRef.current) {
            lastElementRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    React.useEffect(() => {

        socket?.on("room:user:messaged", async (data) => {
            setMessages((prevStateData: TMessage[]) => {
                return [...prevStateData, {
                    socketid: data.socketid,
                    username: data.username,
                    message: data.message,
                    file: data.file,
                    timestamp: data?.timestamp
                } as TMessage]
            })
        })

        return () => {
            socket?.off("room:user:messaged")
        }
    }, [])

    return (
        <div className="relative h-full w-full border bg-[#DAD3CC] rounded-r overflow-y-scroll overflow-x-hidden">
            <div className="h-full overflow-y-scroll bg-[#DAD3CC]">
                <div className="mb-16">
                    <div className="flex justify-center my-4">
                        <div className="rounded py-2 px-4 bg-[#FCF4CB]">
                            <p className="text-xs">
                                Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                            </p>
                        </div>
                    </div>
                    {
                        messages.map((message: TMessage, index: number) => {
                            console.log(message.file)
                            return (
                                <div
                                    key={index}
                                    ref={index === messages.length - 1 ? lastElementRef : null}
                                    className={cn(
                                        message.username === "system" ? "flex items-center justify-center"
                                            : message.socketid === user.socketid
                                                ? "p-2 m-2 flex gap-2 justify-end rounded-t rounded-bl"
                                                : "p-2 m-2 flex gap-2 justify-start rounded-t rounded-br"
                                    )}
                                >
                                    {
                                        message.username === "system" ? (
                                            <p className="text-sm rounded my-1 py-2 px-4 bg-[#DDECF2]">
                                                {message.message}
                                            </p>
                                        ) : (
                                            <div
                                                className={cn(
                                                    "py-2 px-3 flex flex-col rounded",
                                                    message.socketid === user.socketid ? "bg-[#E2F7CB]" : "bg-[#F2F2F2]"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "text-sm font-semibold cursor-pointer",
                                                        message.socketid === user.socketid ? "text-yellow-600" : "text-red-500"
                                                    )}
                                                >

                                                    {message.username}
                                                </span>

                                                <div className="flex gap-2 flex-col">
                                                    {
                                                        message?.file && (
                                                            <Button
                                                                variant={"outline"}
                                                                onClick={() => {
                                                                    const element = document.createElement("a");
                                                                    const newfile = new Blob([message.file?.file!], { type: message.file?.type! });
                                                                    element.href = URL.createObjectURL(newfile);
                                                                    element.download = message.file?.name!;
                                                                    document.body.appendChild(element); // Required for this to work in FireFox
                                                                    element.click();
                                                                }}
                                                                className="border flex gap-2 rounded-full text-gray-500 hover:text-gray-600"
                                                            >
                                                                <FileDown />
                                                                <span>Download</span>
                                                            </Button>
                                                        )
                                                    }
                                                    <span className="text-xs">
                                                        {message.message}
                                                    </span>
                                                </div>
                                                <p className="mt-3 text-right text-xs text-grey-dark">
                                                    {message?.timestamp}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="absolute w-full p-1 h-16 border bottom-0 flex gap-2 items-center rounded bg-slate-50">
                <Input
                    value={text}
                    placeholder="Type a message"
                    onChange={(event: any) => {
                        setText(event.target.value)
                    }}
                    onKeyDown={(event: any) => {
                        if (event.key === 'Enter') {
                            handleOnEnter()
                        }
                    }}
                    className="h-[48px] resize-none focus-visible:outline-none focus-visible:ring-0"
                />
                <div className="flex gap-1 items-center justify-center">

                    <div>
                        {
                            file ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="border border-red-800 rounded-full text-gray-500 hover:text-gray-600"
                                            >
                                                <FilePlus2 className="h-4 w-4 text-red-800" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="p-1">{file.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ? (
                                            <Button
                                                variant={"outline"}
                                                className="border rounded-full text-gray-500 hover:text-gray-600"
                                            >
                                                <Upload />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant={"outline"}
                                                className="border rounded-full text-gray-500 hover:text-gray-600"
                                            >
                                                <Paperclip />
                                            </Button>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    <Button
                        variant={"outline"}
                        onClick={() => {
                            setEmoji((prevState) => !prevState)
                        }}
                        className="border rounded-full text-gray-500 hover:text-gray-600"
                    >
                        <Laugh />
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={handleOnEnter}
                        className="border rounded-full text-gray-500 hover:text-gray-600"
                    >
                        <Send />
                    </Button>
                </div>
                {
                    emoji && (
                        <div className="absolute right-1 bottom-16">
                            <EmojiPicker
                                onEmojiClick={(emoji: EmojiClickData) => {
                                    setText((text: string) => text + emoji.emoji)
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
