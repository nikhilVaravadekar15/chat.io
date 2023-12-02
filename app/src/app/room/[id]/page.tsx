/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React from 'react'
import { validateRoom } from '@/http';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import DrawingBoard from '@/components/DrawingBoard';
import ChatRightSidebar from '@/components/ChatRightSidebar';
import ParticipantsSidebar from '@/components/ParticipantsSidebar';
import { useSocket } from '@/components/providers/SocketContextProvider';
import { RoomContext } from '@/components/providers/RoomContextProvider';
import { TSecretcodeContext, TRoomContext, TRoomDetails } from '@/types';
import { SecretcodeContext } from '@/components/providers/SecretcodeContextProvider';


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
    const [joining, setJoining] = React.useState<boolean>(false)
    const [participants, setParticipants] = React.useState<TParticipant[]>([])
    const { roomDetails, setRoomDetails } = React.useContext<TRoomContext>(RoomContext)
    const { setStatus, passwordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)

    React.useEffect(() => {
        const roomid: string = params.id
        if (!passwordDetails.code) {
            console.log("check 1")
            setStatus(true)
        }
        if ((!roomDetails.id || !roomDetails.created_at) && passwordDetails.code) {
            console.log("check 2")
            setJoining(true)
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
            }).finally(() => {
                setJoining(false)
            })
        }
    }, [passwordDetails.code])

    React.useEffect(() => {
        const roomid: string = params.id

        if (roomDetails.id && roomDetails.created_at && passwordDetails.code) {
            console.log("room:join")
            socket?.emit("room:join", { roomid: roomid });
        }

        socket?.on("room:user:joined", async (data) => {
            setParticipants((prevData: TParticipant[]) => {
                return [...prevData, data]
            })
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
        <main className="relative h-screen w-screen flex flex-col items-center">
            {
                joining ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="h-[60px] w-full">
                            <Navbar />
                        </div>
                        <div className="h-[calc(100%-60px)] w-full grid grid-cols-[20%_minmax(55%,_1fr)_25%]">
                            <ParticipantsSidebar />
                            <DrawingBoard />
                            <ChatRightSidebar />
                        </div>
                    </>
                )
            }
        </main>
    )
}
