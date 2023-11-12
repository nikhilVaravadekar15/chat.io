"use client"

import {
    Copy,
    CheckCheck,
    Link as LucideLink
} from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import copy from 'copy-to-clipboard';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export function Navbar() {

    const [isCopied, setIsCopied] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsCopied(false)
        }, 5000)

        return () => clearTimeout(timer)
    })

    return (
        <div className="w-full p-2 flex items-center justify-between border rounded-md">
            <div className="inline-flex items-center space-x-2">
                <Link href="/">
                    <Image
                        src={"/apple-icon.png"}
                        alt="logo"
                        width={32}
                        height={32}
                        draggable={false}
                        className="cursor-pointer"
                    />
                </Link>
                <span className="flex gap-1 items-center cursor-pointer">
                    <span className="text-lg font-extrabold">Zoomincognito</span>
                    <span>/</span>
                    <span className="text-base font-bold">roomname</span>
                </span>
            </div>
            <div className="hidden space-x-2 lg:block">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className="flex gap-2 items-center justify-center bg-[#0096df] hover:bg-[#0096ff]"
                        >
                            <LucideLink size={"1rem"} />
                            Invite
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align={"start"} className="w-80">
                        <div className="flex gap-2 items-center justify-center px-4 py-3 bg-white border rounded-lg">
                            <input
                                type="text"
                                id="link"
                                disabled={true}
                                value="http://localhost:3001/room/:id"
                                className="text-black bg-transparent cursor-pointer select-all overflow-hidden"
                            />
                            {
                                isCopied ? (
                                    <CheckCheck
                                        className="p-2 w-9 h-9 text-xl text-green-700 border border-green-500 rounded-full cursor-pointer"
                                    />
                                ) : (
                                    <Copy
                                        className="p-2 w-9 h-9 text-xl text-gray-700 border border-gray-500 rounded-full cursor-pointer"
                                        onClick={() => {
                                            copy("http://localhost:3001/room/:id");
                                            setIsCopied(true)
                                        }}
                                    />
                                )
                            }
                        </div>

                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
