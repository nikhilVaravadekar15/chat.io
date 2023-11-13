import roomController from '../controller/RoomController';
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.post("/api/room/create", roomController.createRoom);
router.post("/api/room/validate", roomController.validateRoom);

router.get('/404', (request: Request, response: Response) => {
    response.status(404).json({ "message": "404 not found" })
});

router.get('/api/test', (request: Request, response: Response) => {
    response.json({ "message": "Express + TypeScript Server" })
})


export default router;
