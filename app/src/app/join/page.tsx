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
import { validateRoom } from '@/http'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod';
import { TRoom, TRoomContext, TRoomDetails } from "@/types"
import { RoomContext } from '@/components/providers/RoomContextProvider'


export default function JoinPage() {

    const router = useRouter()
    const { toast } = useToast()
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
            router.push(`/room/${roomid}`)
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Unable to join room",
                description: error?.response.data?.message ? error?.response.data?.message : "Something went wrong, please try again later.",
            })
        }
    })

    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <Card className="w-[448px]">
                <CardHeader>
                    <CardTitle className="flex gap-1 items-center">
                        <Hash className="animate-bounce cursor-pointer text-[#ffff16]" />
                        Join room
                    </CardTitle>
                    <CardDescription className="flex gap-2 items-center">
                        <span>Join new room in one-click</span>
                        or
                        <Link href={"/create"} className="text-blue-400 text-base font-bold hover:underline hover:text-[#ffff16]">Create</Link>
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
                                className="bg-[#ffff16] hover:bg-[#e4e440]"
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
