import express from "express"
import morgan from "morgan"
import mensages from "./routes/mesages"
import auth from "./routes/auth"
import room from "./routes/room"
import users from "./routes/users"
import cors from "cors"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
dotenv.config()

const app = express()


app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization'],
   }))


app.use("/api/mesages", mensages)
app.use("/api/auth", auth)
app.use("/api/room", room)
app.use("/api/users", users)

export default app



