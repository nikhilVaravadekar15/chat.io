import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'
import { TParticipant } from "@/types"


type Props = {
    participants: TParticipant[]
}

export default function Participants({ participants }: Props) {
    return (
        <div className="h-full w-full border rounded-l overflow-y-scroll bg-slate-50">
            <div className="w-full p-3 grid gap-1 grid-cols-1 items-center md:grid-cols-3">
                {
                    participants.map((participant: TParticipant, index: number) => {
                        return (
                            <div
                                key={index}
                                className="h-[70px] w-[70px] flex items-center justify-center cursor-pointer border bg-[#FCF4CB] rounded-2xl hover:shadow-lg hover:shadow-teal-100"
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage
                                                    draggable={false}
                                                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${participant.username}`} />
                                                <AvatarFallback>
                                                    {participant.username.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="p-1">
                                                {participant.username}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}
