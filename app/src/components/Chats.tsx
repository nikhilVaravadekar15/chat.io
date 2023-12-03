/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React from 'react'
import { TParticipant, TRoomContext } from '@/types'
import InputEmoji from 'react-input-emoji'
import { useSocket } from '@/components/providers/SocketContextProvider'
import { RoomContext } from './providers/RoomContextProvider'
import { cn } from '@/lib/utils'


type Props = {
    user: TParticipant
}

type TMessage = {
    socketid: string,
    username: string,
    message: string,
    status?: boolean
}

export default function Chats({ user }: Props) {

    const socket = useSocket()
    const [text, setText] = React.useState<string>('')
    const lastElementRef = React.useRef<HTMLDivElement>(null);
    const [messages, setMessages] = React.useState<TMessage[]>([])
    const { roomDetails } = React.useContext<TRoomContext>(RoomContext)

    function handleOnEnter(text: string) {
        if (text.trim() === "") return
        socket?.emit("room:user:message", {
            roomid: roomDetails.id,
            msg: {
                socketid: user.socketid,
                username: user.username,
                message: text,
            } as TMessage
        })
    }

    React.useEffect(() => {
        if (lastElementRef.current) {
            lastElementRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    React.useEffect(() => {

        socket?.on("room:user:messaged", async (data) => {
            setMessages((prevData: TMessage[]) => {
                return [...prevData, {
                    socketid: data.socketid,
                    username: data.username,
                    message: data.message,
                    status: data?.status
                } as TMessage]
            })
        })

        return () => {
            socket?.off("room:user:messaged")
        }
    }, [])

    return (
        <div className="relative  h-full w-full border overflow-y-scroll">
            <div className="h-full overflow-y-scroll">
                <div className="mb-16">
                    {
                        messages.map((message: TMessage, index: number) => {
                            return (
                                <div
                                    key={index}
                                    ref={index === messages.length - 1 ? lastElementRef : null}
                                    className={cn(
                                        "p-2 m-2 flex gap-2 flex-col justify-center border rounded-t rounded-br",
                                        message.status ? "bg-green-800 border-green-600" : "bg-slate-800 border-white"
                                    )}
                                >
                                    {
                                        message.username != "system" && (
                                            <span
                                                className={cn(
                                                    "text-sm font-semibold cursor-pointer",
                                                    message.status ? "text-yellow-300" : "text-yellow-500"

                                                )}
                                            >
                                                {message.username}
                                            </span>
                                        )
                                    }
                                    <span className="ml-2 text-xs">
                                        {message.message}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full p-1 h-16 border absolute bottom-0 flex items-center rounded bg-[#020817]">
                <InputEmoji
                    value={text}
                    fontSize={16}
                    borderRadius={12}
                    onChange={setText}
                    cleanOnEnter={true}
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                />
            </div>
        </div>
    )
}
