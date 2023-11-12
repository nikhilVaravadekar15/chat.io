import roomController from '../controller/RoomController';
import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()


router.post('/api/room', roomController.createRoom);
router.get('/api/room/:room', roomController.getRoom);

router.get('/api/test', (req: Request, res: Response) => {
    res.json({ "message": "Express + TypeScript Server" })

})

export default router;
