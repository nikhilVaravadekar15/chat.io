"use client"

import React from "react";
import { TActionButtonContext } from "@/types";


type Props = {
    children: React.ReactNode
}

export const ActionButtonContext = React.createContext<TActionButtonContext>({
    audio: true,
    setAudio: () => { },
    video: true,
    setVideo: () => { },
    screenShare: true,
    setScreenShare: () => { }
});

export function SecretcodeContextProvider({ children }: Props) {

    const [audioDetails, setAudioDetails] = React.useState<boolean>(false);
    const [videoDetails, setVideoDetails] = React.useState<boolean>(false);
    const [screenShareDetails, setScreenShareDetails] = React.useState<boolean>(false);

    function setAudio(audio: boolean) {
        setAudioDetails(audio)
    }

    function setVideo(video: boolean) {
        setVideoDetails(video)
    }

    function setScreenShare(screenShare: boolean) {
        setScreenShareDetails(screenShare)
    }

    return (
        <ActionButtonContext.Provider
            value={{
                audio: audioDetails,
                setAudio: setAudio,
                video: videoDetails,
                setVideo: setVideo,
                screenShare: screenShareDetails,
                setScreenShare: setScreenShare
            }}
        >
            {children}
        </ActionButtonContext.Provider>
    )
}
