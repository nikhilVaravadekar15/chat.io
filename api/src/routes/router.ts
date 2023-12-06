import roomController from '../controller/RoomController';
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.post("/api/room/create", roomController.createRoom);
router.post("/api/room/validate", roomController.validateRoom);

export default router;
