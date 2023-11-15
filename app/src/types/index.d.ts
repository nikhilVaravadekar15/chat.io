import { z } from 'zod';
import { room, username } from '@/zod';

export type TUser = z.infer<typeof username>

export type TUserContext = {
    userDetails: TUser
    setUserDetails: (user: TUser) => void
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
