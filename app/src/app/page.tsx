"use client"

import {
  Info,
  ArrowBigRight,
  MessagesSquare,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'
import { room } from "@/zod"
import Link from 'next/link'
import { createRoom } from '@/http'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RoomContext } from '@/components/providers/RoomContextProvider'
import { TRoom, TRoomContext, TRoomDetails, TSecretcodeContext } from "@/types"
import { SecretcodeContext } from '@/components/providers/SecretcodeContextProvider'


export default function Home() {

  const router = useRouter()
  const { toast } = useToast()
  const { setRoomDetails } = React.useContext<TRoomContext>(RoomContext);
  const { setPasswordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)
  const {
    control,
    register,
    getFieldState,
    handleSubmit,
  } = useForm<TRoom>({
    resolver: zodResolver(room),
  });

  const createRoomMutation = useMutation({
    mutationFn: async (data: TRoom) => {
      return await createRoom(data)
    },
    onSuccess: (response: any) => {
      const room: TRoomDetails = response?.data?.room
      setRoomDetails(room)
      setPasswordDetails({
        code: room.code!
      })
      router.push(`/room/${room.id!}`)
    },
    onError: (error: any) => {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Unable to create room",
        description: "Something went wrong, please try again later.",
      })
    }
  })

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="flex gap-3">
        <Card className="h-fit w-[448px]">
          <CardHeader>
            <CardTitle className="flex gap-1 items-center">
              <MessagesSquare className="text-teal-500 cursor-pointer hover:text-teal-600" />
              Create room
            </CardTitle>
            <CardDescription className="flex gap-2 items-center">
              <span>Create new room in one-click</span>
              or
              <Link href={"/join"} className="text-sm font-bold hover:underline hover:text-teal-500">Join</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data: TRoom) => {
                createRoomMutation.mutate(data)
              })}
            >
              <div className="space-y-1">
                <Label htmlFor="name">Room name</Label>
                <Input
                  type="text"
                  id="name"
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
                  Create
                  <ArrowBigRight size={"1.25rem"} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
