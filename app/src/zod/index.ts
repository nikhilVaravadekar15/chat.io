import { z } from 'zod';

export const username = z.object({
    name: z.string()
        .min(1, "Required")
        .max(256, "Username must be less than 256 characters"),
})

export const password = z.object({
    code: z.string()
        .min(1, "Required")
        .max(64, "Secret code must be less than 64 characters"),
})

export const room = z.object({
    name: z.string()
        .min(1, "Required")
        .max(256, "Room name must be less than 256 characters"),
    code: z.string()
        .min(1, "Required")
        .max(256, "Secret code must be less than 256 characters"),
})
