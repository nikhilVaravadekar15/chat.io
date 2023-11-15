"use client"

import {
    Hand,
    Mic,
    MicOff,
    PhoneOff,
    Users2,
    Video,
    VideoOff
} from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {}

export default function ActionButtons({ }: Props) {
    const [mic, setMic] = React.useState<boolean>(true);
    const [video, setVideo] = React.useState<boolean>(true);
    const [raise, setRaise] = React.useState<boolean>(false);

    return (
        <div className="w-full p-3 relative flex items-center justify-center border rounded-md">
            <div className="absolute left-4 flex gap-4 items-center justify-center">
                <div className="text-lg font-bold">Team meeting</div>
            </div>
            <div className="absolute right-8 flex gap-4 items-center justify-center">
                <div className="relative cursor-pointer">
                    <Users2 size={"1.25rem"} />
                    <span className="h-5 w-5 absolute -top-3 -right-3 text-xs flex items-center justify-center border rounded-full">40</span>
                </div>
            </div>
            <div className="flex gap-3 items-center justify-center">
                <Button
                    onClick={() => {
                        setMic(state => !state)
                    }}
                    variant={"outline"}
                    className="rounded-full cursor-pointer"
                >
                    {
                        mic ? (
                            <Mic />
                        ) : (
                            <MicOff />
                        )
                    }

                </Button>
                <Button
                    onClick={() => {
                        setVideo(state => !state)
                    }}
                    variant={"outline"}
                    className="rounded-full cursor-pointer"
                >
                    {
                        video ? (
                            <Video />
                        ) : (
                            <VideoOff />
                        )
                    }
                </Button>
                <Button
                    onClick={() => {
                        setRaise(state => !state)
                    }}
                    variant={"outline"}
                    className="rounded-full cursor-pointer"
                >
                    <Hand
                        className={cn(raise && "text-yellow-600")}
                    />
                </Button>
                <Button
                    variant={"destructive"}
                    className="rounded-full cursor-pointer"
                >
                    <PhoneOff />
                </Button>
            </div>
        </div>
    )
}
