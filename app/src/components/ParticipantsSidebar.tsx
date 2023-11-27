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


type Props = {}

export default function ParticipantsSidebar({ }: Props) {
    return (
        <div className="h-full w-full border overflow-y-scroll">
            <div className="p-2 grid gap gap-1 grid-cols-3">

                <div className="h-[64px] flex items-center justify-center border rounded-md">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Avatar>
                                    <AvatarImage draggable={false} src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="p-1">user name</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

            </div>
        </div>
    )
}
