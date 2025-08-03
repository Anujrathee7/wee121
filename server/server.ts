import express, {Express, Request, Response} from "express"
import path from "path"
import router from "./router"
import morgan from "morgan"
import mongoose, { Connection } from 'mongoose'
import cors, { CorsOptions } from 'cors'

const app: Express = express()
const port = 1234

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

app.use(express.json()) // Add this line to ensure request body is parsed
app.use("/", router)

db.on("error", console.error.bind(console, "MongoDB connection error"))
if (process.env.NODE_ENV==='development') {
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
}
if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.resolve("../..","client","dist")))
    app.get("*",(req: Request, res: Response) => {
        res.sendFile(path.resolve("../..", "client", "dist", "index.html"))
    })
}

app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})