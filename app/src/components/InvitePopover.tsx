import {
    Copy,
    Link,
    CheckCheck
} from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'
import copy from 'copy-to-clipboard'
import { TRoomContext } from '@/types'
import { Button } from "@/components/ui/button"
import { RoomContext } from '@/components/providers/RoomContext'


type Props = {}

export default function InvitePopover({ }: Props) {

    const [isCopied, setIsCopied] = React.useState(false)
    const { roomDetails } = React.useContext<TRoomContext>(RoomContext);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsCopied(false)
        }, 5000)

        return () => clearTimeout(timer)
    })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="flex gap-2 items-center text-white justify-center bg-[#0096df] hover:bg-[#0096ff]"
                >
                    <Link size={"1rem"} />
                    <span>Invite</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align={"start"} className="m-3 w-80 shadow-md shadow-white">
                <span className="text-lg font-bold">Invite Link</span>
                <div className="flex gap-2 items-center justify-center px-4 py-3 border rounded-lg">
                    <input
                        type="text"
                        id="link"
                        disabled={true}
                        value={`${process.env.NEXT_PUBLIC_BASE_URL!}join?id=${roomDetails.id}`}
                        className="bg-transparent cursor-pointer select-all overflow-hidden"
                    />
                    {
                        isCopied ? (
                            <CheckCheck
                                className="p-2 w-9 h-9 text-xl text-green-700 border border-green-500 rounded-full cursor-pointer"
                            />
                        ) : (
                            <Copy
                                className="p-2 w-9 h-9 text-xl text-gray-500 border border-gray-500 rounded-full cursor-pointer"
                                onClick={() => {
                                    copy(`${process.env.NEXT_PUBLIC_BASE_URL!}join?id=${roomDetails.id}`);
                                    setIsCopied(true)
                                }}
                            />
                        )
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}
