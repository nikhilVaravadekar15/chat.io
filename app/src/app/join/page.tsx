"use client"

import {
    Hash,
    ArrowBigRight
} from 'lucide-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import React from 'react'
import { room } from "@/zod"
import Link from 'next/link'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createRoom, validateRoom } from '@/http'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod';
import { TRoom, TRoomContext, TRoomDetails } from "@/types"
import { RoomContext } from '@/components/providers/RoomContext'


type Props = {
    params: {},
    searchParams: { id: string }
}

export default function JoinPage({ searchParams }: Props) {

    const { toast } = useToast()
    const { push } = useRouter()
    const [roomid, setRoomid] = React.useState<string>("")
    const { setRoomDetails } = React.useContext<TRoomContext>(RoomContext)
    const {
        register: registerJoin,
        getFieldState: getFieldStateJoin,
        handleSubmit: handleSubmitJoin,
    } = useForm<TRoom>({
        resolver: zodResolver(room),
    });

    // Mutations
    const { isLoading, isSuccess, isError, mutate, data: response } = useMutation({
        mutationFn: async (data: TRoom) => {
            return await validateRoom(data)
        },
        onSuccess: (response) => {
            const room: TRoomDetails = response?.data?.room
            const roomid: string = room.id!
            setRoomDetails(room)
            push(`/room/${roomid}`)
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Unable to create room",
                description: "Something went wrong, please try again later.",
            })
        }
    })

    React.useEffect(() => {
        const roomid: string = searchParams.id
        setRoomid(roomid ? roomid : "")
    }, [])


    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <Card className="w-[448px]">
                <CardHeader>
                    <CardTitle className="flex gap-1 items-center">
                        <Hash className="cursor-pointer text-[#0096df] hover:text-[#0096ff]" />
                        Join room
                    </CardTitle>
                    <CardDescription className="flex gap-2 items-center">
                        <span>Join new room in one-click</span>
                        or
                        <Link href={"/create"} className="text-blue-400 text-base font-bold hover:underline">Create</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmitJoin((data: TRoom) => {
                            mutate(data)
                        })}
                    >
                        <div className="space-y-1">
                            <Label htmlFor="name">Room id</Label>
                            <Input
                                type="text"
                                id="name"
                                defaultValue={roomid}
                                autoComplete="off"
                                {...registerJoin("name" as const, { required: true })}
                            />
                            <span className="text-xs text-red-500">{getFieldStateJoin("name").error?.message}</span>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="code">Secret code</Label>
                            <Input
                                type="password"
                                id="code"
                                autoComplete="off"
                                {...registerJoin("code" as const, { required: true })}
                            />
                            <span className="text-xs text-red-500">{getFieldStateJoin("code").error?.message}</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button
                                type={"submit"}
                                className="text-white bg-[#0096df] hover:bg-[#0096ff]"
                            >
                                Join
                                <ArrowBigRight size={"1.25rem"} />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
