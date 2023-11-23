import { z } from 'zod';
import { password, room, username } from '@/zod';

export type TUser = z.infer<typeof username>

export type TUserContext = {
    userDetails: TUser
    setUserDetails: (user: TUser) => void
}

export type TCode = z.infer<typeof password>

export type TSecretcodeContext = {
    status: boolean
    setStatus: (status: boolean) => void
    passwordDetails: TCode
    setPasswordDetails: (code: TCode) => void
}

export type TRoom = z.infer<typeof room>
export type TRoomDetails = TRoom & {
    id?: string,
    created_at?: string
}

export type TRoomContext = {
    roomDetails: TRoomDetails
    setRoomDetails: (room: TRoom) => void
}

export type TActionButtonContext = {
    audio: boolean
    setAudio: (audio: boolean) => void
    video: boolean
    setVideo: (video: boolean) => void
    screenShare: boolean
    setScreenShare: (screenShare: boolean) => void
}


