import io from 'socket.io';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'node:http';
import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import router from './src/routes/router';

const CORS: CorsOptions = {
    origin: ["*"],
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

httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
