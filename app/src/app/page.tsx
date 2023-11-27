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
import { createRoom } from '@/http'
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


export default function Home() {

  const { toast } = useToast()
  const { push } = useRouter()
  const { setRoomDetails } = React.useContext<TRoomContext>(RoomContext);
  const {
    register: registerCreate,
    getFieldState: getFieldStateCreate,
    handleSubmit: handleSubmitCreate,
  } = useForm<TRoom>({
    resolver: zodResolver(room),
  });

  // Mutations
  const { isLoading, isSuccess, isError, mutate, data: response } = useMutation({
    mutationFn: async (data: TRoom) => {
      return await createRoom(data)
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

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[448px]">
        <CardHeader>
          <CardTitle className="flex gap-1 items-center">
            <Hash className="animate-bounce cursor-pointer text-[#ffff16]" />
            Create room
          </CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <span>Create new room in one-click</span>
            or
            <Link href={"/join"} className="text-blue-400 text-base font-bold hover:underline hover:text-[#ffff16]">Join</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmitCreate((data: TRoom) => {
              mutate(data)
            })}
          >
            <div className="space-y-1">
              <Label htmlFor="name">Room name</Label>
              <Input
                type="text"
                id="name"
                autoComplete="off"
                {...registerCreate("name" as const, { required: true })}
              />
              <span className="text-xs text-red-500">{getFieldStateCreate("name").error?.message}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="code">Secret code</Label>
              <Input
                type="password"
                id="code"
                autoComplete="off"
                {...registerCreate("code" as const, { required: true })}
              />
              <span className="text-xs text-red-500">{getFieldStateCreate("code").error?.message}</span>
            </div>
            <div className="flex items-center justify-end">
              <Button
                type={"submit"}
                className="bg-[#ffff16] hover:bg-[#e4e440]"
              >
                Create
                <ArrowBigRight size={"1.25rem"} />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
