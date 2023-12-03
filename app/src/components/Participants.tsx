import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import React from 'react'
import { TParticipant } from "@/types"


type Props = {
    participants: TParticipant[]
}

export default function Participants({ participants }: Props) {
    return (
        <div className="h-full w-full border overflow-y-scroll">
            <div className="p-2 grid gap gap-1 grid-cols-1">
                {
                    participants.map((participant: TParticipant, index: number) => {
                        return (
                            <div key={participant.socketid} className="h-[64px] w-full flex gap-2 items-center border cursor-pointer rounded-md overflow-hidden">
                                <div className="ml-4">
                                    <Avatar>
                                        <AvatarImage
                                            draggable={false}
                                            src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${participant.username}`} />
                                        <AvatarFallback>
                                            {participant.username.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="flex text-sm flex-col justify-center">
                                    <div className="font-bold text-yellow-500 overflow-x-hidden">
                                        {participant.username}
                                    </div>
                                    <div>Points: {participant?.points ? participant?.points : 0}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
