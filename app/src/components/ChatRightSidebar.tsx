"use client"

import React from 'react'
import { Input } from '@/components/ui/input'

type Props = {}

export default function ChatRightSidebar({ }: Props) {
    return (
        <div className="relative  h-full w-full border overflow-y-scroll">
            <div className="h-full overflow-y-scroll">
                <div className="mb-16">

                    <div className="p-2 m-2 flex gap-2 flex-col justify-center border rounded-t rounded-br bg-slate-800 border-white">
                        <span className="text-sm font-semibold text-yellow-500 cursor-pointer">@Elon musk</span>
                        <span className="ml-2 text-xs">Lorem, ipsum.</span>
                    </div>
                    <div className="p-2 m-2 flex gap-2 flex-col justify-center border rounded-t rounded-br bg-green-800 border-green-600">
                        <span className="text-sm font-semibold text-yellow-300 cursor-pointer">@jeff bezos</span>
                        <span className="ml-2 text-xs">Guessed the word</span>
                    </div>

                </div>
            </div>
            <div className="w-full p-1 h-12 absolute bottom-0 flex items-center rounded bg-[#020817]">
                <Input
                    type="text"
                    autoComplete="off"
                    className="bg-slate-600 focus-visible:ring-0"
                />
            </div>
        </div>
    )
}
