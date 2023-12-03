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

export type TParticipant = {
    socketid: string,
    username: string,
    points?: number
}

export type TRoomContext = {
    roomDetails: TRoomDetails
    setRoomDetails: (room: TRoom) => void
}

