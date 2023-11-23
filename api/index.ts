import io from 'socket.io';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'node:http';
import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express';
import router from './src/routes/router';
import fakerService from './src/services/FakerService';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


// # Map<roomid, Map<socketid, username>
let map: Map<string, Map<string, string>> = new Map();

const CORS: CorsOptions = {
    origin: [process.env.CORS_ORIGIN! || "*"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();

const app: Express = express();
const httpServer: http.Server = http.createServer(app)
const port = parseInt(process.env.PORT!)
const socketIo: io.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = new io.Server(httpServer, {
    cors: CORS
})

// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors(CORS))

// HTTP request logger middleware [https://www.npmjs.com/package/morgan]
app.use(morgan("tiny"))

// body parsing middleware [https://expressjs.com/en/4x/api.html#express.json]
app.use(express.json())

// load routers 
app.use("/", router)

socketIo.on("connection", (socket) => {
    const socketid: string = socket.id
    console.log('client connected', socketid);

    socket.on("room:join", ({ roomid }) => {
        console.log("roomid " + roomid)
        if (!map.get(roomid)) {
            map.set(roomid, new Map())
        }
        map.get(roomid)?.set(socketid, fakerService.getFullName())

        socketIo.to(roomid).emit("room:user:joining", {
            socketid: socketid,
            username: map.get(roomid)?.get(socketid),
            joining: true
        })

        socket.join(roomid)
        socketIo.to(socketid).emit("room:user:joined", {
            socketid: socketid,
            username: map.get(roomid)?.get(socketid),
            len: map.get(roomid)?.size || 0,
        })

        console.log(map)
    })

    socket.on("disconnect", () => {
        socket.disconnect(true);
        // map.get(roomid)?.set(socketid, fakerService.getFullName())
        console.log('client disconnected', socket.id);
    })
});


httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
