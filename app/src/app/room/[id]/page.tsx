/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React from 'react'
import { validateRoom } from '@/http';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import ChatRightSidebar from '@/components/Chats';
import { useToast } from '@/components/ui/use-toast';
import ParticipantsSidebar from '@/components/Participants';
import { useSocket } from '@/components/providers/SocketContextProvider';
import { RoomContext } from '@/components/providers/RoomContextProvider';
import { SecretcodeContext } from '@/components/providers/SecretcodeContextProvider';
import { TSecretcodeContext, TRoomContext, TRoomDetails, TParticipant } from '@/types';


type Props = {
    params: { id: string },
    searchParams: {}
}

export default function Roompage({ params }: Props) {

    const socket = useSocket()
    const router = useRouter()
    const { toast } = useToast()
    const [joining, setJoining] = React.useState<boolean>()
    const [currentuser, setCurrentuser] = React.useState<TParticipant>()
    const [participants, setParticipants] = React.useState<TParticipant[]>([])
    const { roomDetails, setRoomDetails } = React.useContext<TRoomContext>(RoomContext)
    const { status, setStatus, passwordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)

    React.useEffect(() => {
        const unloadCallback = (event: any) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    React.useEffect(() => {
        const roomid: string = params.id
        if (!passwordDetails.code) {
            setStatus(true)
        }
        if ((!roomDetails.id || !roomDetails.created_at) && passwordDetails.code) {
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
            socket?.emit("room:user:join", { roomid: roomid });
        }

        socket?.on("room:user:joined", async (data) => {
            if (data.socketid === socket.id) {
                setCurrentuser(data)
            }
            setParticipants((prevData: TParticipant[]) => {
                const tempdata: TParticipant[] = [...prevData, data]
                return tempdata
            })
        });

        socket?.on("room:user:user-name-changed", async (data) => {
            if (data.socketid === socket.id) {
                setCurrentuser(data)
            }
            setParticipants((prevData: TParticipant[]) => {
                const tempdata = prevData.filter((participant: TParticipant) => {
                    return data.socketid != participant.socketid
                })
                tempdata.push(data)
                return tempdata
            })
        });

        socket?.on("room:user:left", async (data) => {
            setParticipants((prevData: TParticipant[]) => {
                const tempdata = prevData.filter((participant: TParticipant) => {
                    return data.socketid != participant.socketid
                })
                return tempdata
            })
        });

        socket?.on("disconnect", (reason) => {
            console.log(reason);
        });

        return () => {
            socket?.off("room:user:joined");
            socket?.off("room:user:user-name-changed");
            socket?.off("room:user:left");
            socket?.off("disconnect");
        };

    }, [roomDetails.created_at])

    return (
        <main className="relative h-screen w-screen container flex flex-col items-center bg-pattern">
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
                        <div className="h-[calc(100%-60px)] w-full grid grid-cols-[14%_minmax(86%,_1fr)] md:grid-cols-[25%_minmax(75%,_1fr)]">
                            <ParticipantsSidebar
                                participants={participants}
                            />
                            <ChatRightSidebar
                                user={currentuser!}
                            />
                        </div>
                    </>
                )
            }
        </main>
    )
}
