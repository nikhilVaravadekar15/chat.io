"use client"

import React from "react";
import { Socket, io } from "socket.io-client";

type Props = {
    children: React.ReactNode
}

const SocketContext = React.createContext<Socket | null>(null);

export const useSocket = () => {
    const socket = React.useContext(SocketContext);
    return socket;
};

export default function SocketContextProvider({ children }: Props) {
    const socket = React.useMemo(() => {
        return io(`ws://${process.env.NEXT_PUBLIC_SOCKETIO_URL!}`,
            {
                reconnectionDelayMax: 10000,
            }
        )
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
