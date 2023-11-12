import { Response, Request } from "express";

class RoomController {

    async getRoom(response: Response, request: Request) {
        response.send('Get Room')
    }

    async createRoom(response: Response, request: Request) {
        response.send('create Room')
    }

}

export default new RoomController()
