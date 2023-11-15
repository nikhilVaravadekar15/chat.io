"use client"

import React from 'react'
import { cn } from '@/lib/utils';
import io from 'socket.io-client';
import { Navbar } from '@/components/Navbar'
import Videocard from '@/components/Videocard'
import ActionButtons from '@/components/ActionButtons';

type Props = {
    params: { id: string },
    searchParams: {}
}
export default function Roompage({ params }: Props) {

    React.useEffect(() => {
        const roomid: string = params.id

        const socket = io(`ws://${process.env.NEXT_PUBLIC_SOCKETIO_URL!}`, {
            reconnectionDelayMax: 10000,
        });

        socket.emit("room:join", roomid);

    }, [])


    const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <main className="relative h-screen w-screen flex flex-col items-center justify-center">
            <Navbar />
            <div className={cn(
                "h-full w-full mb-16 p-4 grid gap-2 items-center justify-center",
                array.length === 1 && "grid-rows-1 grid-cols-1",
                array.length > 1 && array.length <= 4 && "grid-cols-2",
                array.length > 4 && array.length < 9 && "grid-cols-3",
                array.length >= 9 && array.length <= 12 && "grid-rows-2 grid-cols-6",
                array.length > 12 && array.length <= 15 && "grid-rows-3 grid-cols-5",
                array.length > 15 && array.length <= 21 && "grid-rows-4 grid-cols-5",
                array.length > 21 && array.length <= 25 && "grid-rows-5 grid-cols-5",
                array.length > 25 && array.length <= 30 && "grid-rows-5 grid-cols-6",
                array.length > 30 && array.length <= 35 && "grid-rows-6 grid-cols-6",
                array.length > 35 && array.length <= 40 && "grid-rows-4 grid-cols-10",
            )}>
                {
                    array.map((num: number, index: number) => {
                        return (
                            <Videocard key={num} />
                        )
                    })
                }
            </div>
            <div className="absolute bottom-0 w-full">
                <ActionButtons />
            </div>
        </main >
    )
}
