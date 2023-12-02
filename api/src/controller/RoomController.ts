import { TRoom } from "../types";
import { Response, Request } from "express";
import RoomService from "../services/RoomService";
import hashService from "../services/HashService";

class RoomController {

    async validateRoom(request: Request, response: Response,) {

        try {

            const { room: roomid, code: password }: TRoom = request.body;
            if (!roomid || !password) {
                return response.status(400).json({
                    "message": "All fields are required"
                })
            }

            const room = await RoomService.getUniqueRoom(roomid!)
            if (!room) {
                return response.status(404).json({
                    "message": "Invalid room id"
                })
            }

            const valid: boolean = await hashService.comparehash(password, room.code)
            if (!valid) {
                return response.status(401).json({
                    "message": "Invalid secret code"
                })
            }

            return response.status(200).json({
                "room": room!
            })

        }
        catch (error: any) {
            console.log(error)
            return response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }

    async createRoom(request: Request, response: Response,) {

        try {

            const { room: roomname, code: password, words }: TRoom = request.body;
            if (!roomname || !password) {
                return response.status(400).json({
                    "message": "All fields are required"
                })
            }

            const room = await RoomService.createRoom({
                room: roomname!,
                code: await hashService.gethash(password!),
                words: words
            })
            if (!room) {
                return response.status(500).json({
                    "message": "Something went wrong, please try again."
                })
            }

            return response.status(201).json({
                "room": room!
            })

        }
        catch (error: any) {
            console.log(error)
            return response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }

}

export default new RoomController()
