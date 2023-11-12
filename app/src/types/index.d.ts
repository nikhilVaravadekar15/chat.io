import { z } from 'zod';

export type TRoom = z.infer<typeof room>
