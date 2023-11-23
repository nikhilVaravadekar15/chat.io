/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React from 'react'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getRoom, validateRoom } from '@/http';
import { Navbar } from '@/components/Navbar'
import Videocard from '@/components/Videocard'
import peerService from '@/service/PeerService'
import { useToast } from '@/components/ui/use-toast';
import ActionButtons from '@/components/ActionButtons';
import { RoomContext } from '@/components/providers/RoomContextProvider';
import { TSecretcodeContext, TRoomContext, TRoomDetails, TActionButtonContext } from '@/types';
import { SecretcodeContext } from '@/components/providers/SecretcodeContextProvider';
import { useSocket } from '@/components/providers/SocketContextProvider';
import Spinner from '@/components/Spinner';
import { ActionButtonContext } from '@/components/providers/ActionButtonContextProvider';


type Props = {
    params: { id: string },
    searchParams: {}
}

type TParticipant = {
    socketid: string,
    username: string,
    joining?: true
}

export default function Roompage({ params }: Props) {

    const socket = useSocket()
    const router = useRouter()
    const { toast } = useToast()
    const [myStream, setMyStream] = React.useState<MediaStream>();
    const [joining, setJoining] = React.useState<boolean>(false)
    const [participants, setParticipants] = React.useState<TParticipant[]>([])
    const { roomDetails, setRoomDetails } = React.useContext<TRoomContext>(RoomContext)
    const { setStatus, passwordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)
    const { audio, video } = React.useContext<TActionButtonContext>(ActionButtonContext)

    React.useEffect(() => {
        const roomid: string = params.id
        if (!roomDetails.id && !roomDetails.created_at && !passwordDetails.code) {
            getRoom(roomid)
                .then((response) => {
                    const room: TRoomDetails = response.data?.room
                    if (room) {
                        setStatus(true)
                    }
                }).catch((error) => {
                    if (error.response.status === 404) {
                        router.push("/not-found")
                    }
                })
        }
    }, [])

    React.useEffect(() => {
        const roomid: string = params.id
        if ((!roomDetails.id || !roomDetails.created_at) && passwordDetails.code) {
            validateRoom({
                name: roomid, code: passwordDetails.code
            }).then((response) => {
                const room: TRoomDetails = response.data?.room
                setRoomDetails(room)
            }).catch((error) => {
                if (error.response.status === 404) {
                    router.push("/not-found")
                }
                if (error.response.status === 401) {
                    setStatus(true)
                    toast({
                        variant: "destructive",
                        title: "Unable to join room",
                        description: error.response.data?.message ?
                            error.response.data?.message : "Something went wrong, please try again later.",
                    })
                }
            })
        }
    }, [passwordDetails.code])

    React.useEffect(() => {
        const roomid: string = params.id

        if (roomDetails.id && roomDetails.created_at && passwordDetails.code) {
            console.log("room:join")
            socket?.emit("room:join", { roomid: roomid });
        }

        socket?.on("room:user:joining", (data) => {
            setParticipants((prevData: TParticipant[]) => {
                return [...prevData, data]
            })
        });

        socket?.on("room:user:joined", async (data) => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: audio,
                video: video,
            });
            setJoining(true)
            const offer: RTCSessionDescriptionInit | undefined = await peerService.getOffer();
            socket?.emit("room:meet", { offer });
            setMyStream(stream);
        });

        socket?.on("disconnect", (reason) => {
            console.log(reason);
        });

        return () => {
            socket?.off("room:join");
            socket?.off("room:user:joining");
            socket?.off("room:user:joined");
            socket?.off("disconnect");
        };

    }, [roomDetails.created_at])

    return (
        <main className="relative h-screen w-screen flex flex-col items-center justify-center">
            <Navbar />
            <div className={cn(
                "h-full w-full mb-16 p-4 grid gap-2 items-center justify-center",
                participants.length === 1 && "grid-rows-1 grid-cols-1",
                participants.length > 1 && participants.length <= 4 && "grid-cols-2",
                participants.length > 4 && participants.length < 9 && "grid-cols-3",
                participants.length >= 9 && participants.length <= 12 && "grid-rows-2 grid-cols-6",
                participants.length > 12 && participants.length <= 15 && "grid-rows-3 grid-cols-5",
                participants.length > 15 && participants.length <= 21 && "grid-rows-4 grid-cols-5",
                participants.length > 21 && participants.length <= 25 && "grid-rows-5 grid-cols-5",
                participants.length > 25 && participants.length <= 30 && "grid-rows-5 grid-cols-6",
                participants.length > 30 && participants.length <= 35 && "grid-rows-6 grid-cols-6",
                participants.length > 35 && participants.length <= 40 && "grid-rows-4 grid-cols-10",
            )}>
                {
                    participants.length === 0 && joining && (
                        <div>
                            <Spinner />
                            Waiting for others
                        </div>
                    )
                }
                {
                    participants.length != 0 && participants.map((participant: TParticipant, index: number) => {
                        return (
                            <Videocard key={index} />
                        )
                    })
                }
            </div>
            <div className="absolute bottom-0 w-full">
                <ActionButtons />
            </div>
        </main >
    )
}
