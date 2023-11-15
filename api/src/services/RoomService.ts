import { eq } from "drizzle-orm";
import { TRoom } from "../types";
import { db } from "../database/index";
import { rooms } from "../database/schema";


class RoomService {

    async createRoom({ room: roomname, code: hashpassword }: TRoom) {
        return (await db.insert(rooms).values({
            name: roomname,
            code: hashpassword
        }).returning())[0];
    }

    async getUniqueRoom(roomid: string) {
        return (await db.select().from(rooms).where(eq(rooms.id, roomid)))[0];
    }

}

export default new RoomService();
