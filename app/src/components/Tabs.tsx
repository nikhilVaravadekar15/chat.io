"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRoom } from "@/types"
import { room } from "@/zod"
import { cn } from "@/lib/utils"


export function TabsDemo() {
    return (
        <Tabs defaultValue="create" className="w-[512px]">
            <TabsList className="grid w-full grid-cols-2 border">
                <TabsTrigger
                    className="data-[state=active]:text-black data-[state=active]:bg-slate-300"
                    value="create"
                >
                    Create
                </TabsTrigger>
                <TabsTrigger
                    className="data-[state=active]:text-black data-[state=active]:bg-slate-300"
                    value="join"
                >
                    Join
                </TabsTrigger>
            </TabsList>
            <TabsContent value="create">
                <CreateRoomCard />
            </TabsContent>
            <TabsContent value="join">
                <JoinRoomCard />
            </TabsContent>
        </Tabs>
    )
}

function CreateRoomCard() {

    const {
        register,
        getFieldState,
        handleSubmit,
    } = useForm<TRoom>({
        resolver: zodResolver(room),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create room</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    className="space-y-2"
                    onSubmit={handleSubmit((data: TRoom) => {
                        console.log(data)
                    })}
                >
                    <div className="space-y-1">
                        <Label htmlFor="roomname">Room name</Label>
                        <Input
                            type="text"
                            id="roomname"
                            autoComplete="off"
                            {...register("roomname" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("roomname").error?.message}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Secret code</Label>
                        <Input
                            type="password"
                            id="password"
                            autoComplete="off"
                            {...register("password" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("password").error?.message}</span>
                    </div>
                    <Button
                        type={"submit"}
                        className="bg-[#0096df] hover:bg-[#0096ff]"
                    >
                        Create
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

function JoinRoomCard() {

    const {
        register,
        getFieldState,
        handleSubmit,
    } = useForm<TRoom>({
        resolver: zodResolver(room),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Join room</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    className="space-y-2"
                    onSubmit={handleSubmit((data: TRoom) => {
                        console.log(data)
                    })}
                >
                    <div className="space-y-1">
                        <Label htmlFor="roomname">Room name</Label>
                        <Input
                            type="text"
                            id="roomname"
                            autoComplete="off"
                            {...register("roomname" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("roomname").error?.message}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Secret code</Label>
                        <Input
                            type="password"
                            id="password"
                            autoComplete="off"
                            {...register("password" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("password").error?.message}</span>
                    </div>
                    <Button
                        type={"submit"}
                        className="bg-[#0096df] hover:bg-[#0096ff]"
                    >
                        Join
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
