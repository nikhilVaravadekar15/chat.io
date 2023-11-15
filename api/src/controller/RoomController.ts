import { Response, Request } from "express";
import { TRoom } from "../types";
import RoomService from "../services/RoomService";
import hashService from "../services/HashService";

class RoomController {

    async getRoom(request: Request, response: Response,) {

        try {

            const roomid: string = request.params.room;
            if (!roomid) {
                response.status(400).json({
                    "message": "All fields are required"
                })
            }

            const room = await RoomService.getUniqueRoom(roomid!)
            if (!room) {
                response.status(404).json({
                    "message": "Invalid room id"
                })
            } else {
                response.status(200).json({
                    "room": room!
                })
            }
        }
        catch (error: any) {
            console.log(error)
            response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }

    async validateRoom(request: Request, response: Response,) {

        try {

            const { room: roomid, code: password }: TRoom = request.body;
            if (!roomid || !password) {
                response.status(400).json({
                    "message": "All fields are required"
                })
            }

            const room = await RoomService.getUniqueRoom(roomid!)
            if (!room) {
                response.status(404).json({
                    "message": "Invalid room id"
                })
            }

            const valid: boolean = await hashService.comparehash(password, room.code)
            console.log(valid)
            if (!valid) {
                response.status(404).json({
                    "message": "Invalid secret code"
                })
            }

            response.status(200).json({
                "room": room!
            })

        }
        catch (error: any) {
            console.log(error)
            response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }

    async createRoom(request: Request, response: Response,) {

        try {

            const { room: roomname, code: password }: TRoom = request.body;
            if (!roomname || !password) {
                response.status(400).json({
                    "message": "All fields are required"
                })
            }

            const room = await RoomService.createRoom({
                room: roomname!,
                code: await hashService.gethash(password!)
            })

            if (!room) {
                response.status(500).json({
                    "message": "Something went wrong, please try again."
                })
            }

            response.status(201).json({
                "room": room!
            })

        }
        catch (error: any) {
            console.log(error)
            response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }

}

export default new RoomController()
