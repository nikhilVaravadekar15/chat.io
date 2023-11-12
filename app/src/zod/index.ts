import { z } from 'zod';

export const room = z.object({
    roomname: z.string()
        .min(1, "Required")
        .max(256, "Room name must be less than 256 characters"),
    password: z.string()
        .min(1, "Required")
        .max(256, "Secret code must be less than 256 characters"),
})
