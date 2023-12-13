import io from 'socket.io';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'node:http';
import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express';
import router from './src/routes/router';
import fakerService from './src/services/FakerService';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { TMessage } from './src/types';
import RoomService from './src/services/RoomService';


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
    cors: CORS,
    maxHttpBufferSize: 512e8 // 512MB
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
    console.info("client connected => ", socket.id);

    socket.on("room:user:join", ({ roomid }) => {
        console.info("roomid => " + roomid)

        if (!map.get(roomid)) {
            map.set(roomid, new Map())
        }
        if (map.get(roomid)?.get(socket.id) === undefined) {
            console.log("undefined")
        }
        map.get(roomid)?.set(socket.id, fakerService.getFullName())
        if (!socket.rooms.has(roomid)) {
            // join room
            socket.join(roomid)
            // broadcast to all the clients 
            socketIo.to(roomid).emit("room:user:joined", {
                socketid: socket.id,
                username: map.get(roomid)?.get(socket.id),
            })
            socketIo.to(roomid).emit("room:user:messaged", {
                socketid: socket.id,
                username: "system",
                message: `${map.get(roomid)?.get(socket.id)} joined the room`
            })
            // send the other client socket id to the sender
            map.get(roomid)?.forEach((username: string, socketid: string) => {
                if (socketid != socket.id) {
                    socketIo.to(socket.id).emit("room:user:joined", {
                        socketid: socketid,
                        username: username,
                    })
                }
            })
        }
    })

    socket.on("room:user:user-name-change", ({ roomid, username }) => {
        var fakename: string
        if (map.get(roomid)?.get(socket.id)) {
            console.info("exits")
            fakename = map.get(roomid)?.get(socket.id)!
            map.get(roomid)?.set(socket.id, username)
        }

        // broadcast to all the clients
        socketIo.to(roomid).emit("room:user:user-name-changed", {
            socketid: socket.id,
            username: map.get(roomid)?.get(socket.id),
        })
        socketIo.to(roomid).emit("room:user:messaged", {
            socketid: socket.id,
            username: "system",
            message: `${fakename!} changed his/her username to ${map.get(roomid)?.get(socket.id)}`
        })
    })

    socket.on("room:user:message", ({ roomid, msg }) => {
        // broadcast to all the clients 
        socketIo.to(roomid).emit("room:user:messaged", {
            socketid: msg.socketid,
            username: msg.username,
            message: msg.message,
            file: msg?.file,
            timestamp: msg.timestamp,
        } as TMessage)
    })

    socket.on("disconnect", () => {
        map.forEach(async (mapvalue, mapkey) => {
            if (mapvalue.has(socket.id)) {
                socket.to(mapkey).emit("room:user:left", {
                    socketid: socket.id,
                    username: mapvalue.get(socket.id),
                });
                socketIo.to(mapkey).emit("room:user:messaged", {
                    socketid: socket.id,
                    username: "system",
                    message: `${mapvalue.get(socket.id)} left the room`,
                    status: false
                } as TMessage)
                mapvalue?.delete(socket.id)
                if (mapvalue.size == 0) {
                    try {
                        map.delete(mapkey)
                        await RoomService.deleteRoomById(mapkey)
                    } catch (error) {
                        console.log(error)
                    }
                }

            }
        })
        socket.disconnect(true);
        console.info("client disconnected => ", socket.id);
    })

});


httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
