"use client"

import {
    ArrowBigRight,
    MessagesSquare
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
import { TRoom, TRoomContext, TRoomDetails, TSecretcodeContext } from "@/types"
import { RoomContext } from '@/components/providers/RoomContextProvider'
import { SecretcodeContext } from '@/components/providers/SecretcodeContextProvider'


export default function JoinPage() {

    const router = useRouter()
    const { toast } = useToast()
    const { setRoomDetails } = React.useContext<TRoomContext>(RoomContext)
    const { setPasswordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)
    const {
        register,
        getFieldState,
        handleSubmit,
    } = useForm<TRoom>({
        resolver: zodResolver(room),
    });

    const roomJoinMutation = useMutation({
        mutationFn: async (data: TRoom) => {
            return await validateRoom(data)
        },
        onSuccess: (response) => {
            const room: TRoomDetails = response?.data?.room
            setRoomDetails(room)
            setPasswordDetails({
                code: room.code!
            })
            router.push(`/room/${room.id!}`)
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
                        <MessagesSquare className="text-teal-500 cursor-pointer hover:text-teal-600" />
                        Join room
                    </CardTitle>
                    <CardDescription className="flex gap-2 items-center">
                        <span>Join new room in one-click</span>
                        or
                        <Link href={"/create"} className="text-sm font-bold hover:underline hover:text-teal-500">Create</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit((data: TRoom) => {
                            roomJoinMutation.mutate(data)
                        })}
                    >
                        <div className="space-y-1">
                            <Label htmlFor="name">Room id</Label>
                            <Input
                                id="name"
                                type="text"
                                autoComplete="off"
                                {...register("name" as const, { required: true })}
                            />
                            <span className="text-xs text-red-500">{getFieldState("name").error?.message}</span>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="code">Secret code</Label>
                            <Input
                                type="password"
                                id="code"
                                autoComplete="off"
                                {...register("code" as const, { required: true })}
                            />
                            <span className="text-xs text-red-500">{getFieldState("code").error?.message}</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button
                                type={"submit"}
                                className="bg-teal-400 hover:bg-teal-500"
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
