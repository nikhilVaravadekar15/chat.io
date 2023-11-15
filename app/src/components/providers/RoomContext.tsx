"use client"

import React from "react";
import { TRoomContext, TRoomDetails } from "@/types";


type Props = {
    children: React.ReactNode
}

const roomDetails: TRoomDetails = {
    name: "",
    code: ""
}

export const RoomContext = React.createContext<TRoomContext>({
    roomDetails: roomDetails,
    setRoomDetails: () => { }
});

export function RoomContextProvider({ children }: Props) {

    const [room, setRoom] = React.useState<TRoomDetails>(roomDetails);
    function setRoomDetails(room: TRoomDetails) {
        setRoom(room);
    }

    return (
        <RoomContext.Provider
            value={{
                roomDetails: room,
                setRoomDetails: setRoomDetails
            }}
        >
            {children}
        </RoomContext.Provider >
    )
}
