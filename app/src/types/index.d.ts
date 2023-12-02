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
    timer?: number,
    rounds?: number,
    created_at?: string
}


export type TRoomContext = {
    roomDetails: TRoomDetails
    setRoomDetails: (room: TRoom) => void
}

