"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TRoomContext } from '@/types'
import { Badge } from "@/components/ui/badge"
import UserDialog from "@/components/UserDialog"
import InvitePopover from '@/components/InvitePopover'
import { RoomContext } from '@/components/providers/RoomContextProvider'


export function Navbar() {

    const { roomDetails } = React.useContext<TRoomContext>(RoomContext);

    return (
        <div className="h-full w-full p-2 flex items-center justify-between border rounded-md">
            <div className="flex gap-6 items-center cursor-pointer">
                <Link href="/" className="flex gap-1 items-center justify-center">
                    <Image
                        src={"/apple-icon.png"}
                        alt="logo"
                        width={32}
                        height={32}
                        draggable={false}
                        className="cursor-pointer"
                    />
                    <div className="text-lg font-bold">Skibble</div>
                </Link>
                {
                    roomDetails.name && (
                        <Badge variant={"secondary"} className="text-base">
                            {roomDetails.name}
                        </Badge>
                    )
                }
            </div>
            <div className="flex gap-3 items-center justify-center">
                <UserDialog />
                <InvitePopover />
            </div>
        </div>
    )
}
